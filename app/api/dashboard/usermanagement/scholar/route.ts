import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs';
import { db } from "@vercel/postgres";
import { getStatusPending } from "@/app/lib/queries/userstatus";
import { getTypeScholar } from "@/app/lib/queries/usertype";
import { GetScholar } from "@/app/lib/definitions";
import { createScholar, editScholar, getScholarByName, getScholars } from "@/app/lib/queries/scholar";

export const GET = async (request: Request) => {
    try {
        const url = new URL(request.url);
        const name = url.searchParams.get('name');
        const labidString = url.searchParams.get('labid');

        const labid = labidString ? parseInt(labidString, 10) : undefined

        if (typeof name !== 'string') {
            return new NextResponse("Mandaste cualquier parametro loco", { status: 400 });
        }

        if (labid === undefined) {
            return new NextResponse("labid is required", { status: 400 });
        }

        let data: GetScholar[];

        if (name.trim() === "") {
            try {
                data = await getScholars(labid);
            } catch (error) {
                console.error("Error recuperando instancias:", error);
                return new NextResponse("Error recuperando becarios", { status: 500 });
            }
        } else {
            try {
                data = await  getScholarByName(name, labid)
            } catch (error) {
                console.error("Error buscando datos:", error);
                return new NextResponse("Error buscando datos", { status: 500 });
            }
        } 

        return new NextResponse(JSON.stringify(data), { status: 200, headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
        console.error("Error manejando GET:", error);
        return new NextResponse("Error manejando GET", { status: 500 });
    }
}

export const POST = async (request: Request) => {
    try {
        const { name,
                file,
                dni,
                address,
                phone,
                careerlevel,
                email,
                password,
                laboratory_id,
                scholarshiptype_id,
                usercareer_id } = await request.json();
                
        const hashedPassword = await bcrypt.hash(password, 5);
        const userstatus = await getStatusPending();
        const usertype = await getTypeScholar();

        const user = {
                name,
                file,
                dni,
                address,
                phone,
                careerlevel,
                email,
                password: hashedPassword,
                laboratory_id,
                usertype_id: usertype,
                userstatus_id: userstatus,
                scholarshiptype_id,
                usercareer_id,
        }

        const client = db;
        const existingUserEmail = await client.sql`
        SELECT * FROM "user" WHERE email = ${email} LIMIT 1
        `;    

        if (existingUserEmail.rows.length > 0) {
            return NextResponse.json({ error: 'El correo electrónico ya está en uso.' }, { status: 400 });
        }

        const existingScholarFile = await client.sql`
        SELECT * FROM "scholar" WHERE file = ${file} LIMIT 1
        `;    

        if (existingScholarFile.rows.length > 0) {
            return NextResponse.json({ error: 'Ya existe una cuenta con este legajo.' }, { status: 400 });
        }

        const existingScholarDNI = await client.sql`
        SELECT * FROM "scholar" WHERE dni = ${dni} LIMIT 1
        `;    

        if (existingScholarDNI.rows.length > 0) {
            return NextResponse.json({ error: 'Ya existe una cuenta con este DNI.' }, { status: 400 });
        }

        try {
            await createScholar(user)
        } catch(error) {
            console.error("Error manejando POST:", error);
            return new NextResponse("Error al crear usuario", { status: 500 });
        }
    
        return NextResponse.json({ status: 201 });
    } catch (error) {
        console.error("Error manejando POST:", error);
        return new NextResponse("Error al crear becario", { status: 500 });
    }
}

export const PUT = async (request: Request) => {
    try {
        const { id, name, file, dni, address, phone, careerlevel, scholarshiptype_id, usercareer_id } = await request.json();

        if (typeof id !== 'number' || typeof name !== 'string' || typeof file !== 'string' || typeof dni !== 'string' || typeof address !== 'string' || typeof phone !== 'string' || typeof careerlevel !== 'number' || typeof scholarshiptype_id !== 'number' || typeof usercareer_id !== 'number') {
            return new NextResponse("Parametros no validos", {status: 400});
        }

        const query = {
            id, name, file, dni, address, phone, careerlevel, scholarshiptype_id, usercareer_id
        }

        try {
            await editScholar(query);
        } catch(error) {
            console.error("Error manejando PUT:", error);
            return new NextResponse("Error al editar usuario", { status: 500 });
        } 

        return new NextResponse("Instancia editada", { status: 200 });
    } catch(error) {
        console.error("Error manejando PUT:", error);
        return new NextResponse("Error al editar usuario", { status: 500 });
    }
}