import { createSupply, dropSupply, editSupply } from "@/app/lib/queries/supply";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
    try {
        const { name,
                description,
                year,
                supplystatus_id,
                supplytype_id,
                laboratory_id } = await request.json();

        if (!name || !description || !year || !supplystatus_id || !laboratory_id || !supplytype_id) {
            return NextResponse.json({ error: 'Faltan datos requeridos.' }, { status: 400 });
        }
    
        const supply = {
            name,
            description,
            year,
            supplystatus_id,
            supplytype_id,
            laboratory_id
        }

        try {
            await createSupply(supply);
        } catch(error) {
            console.error("Error manejando POST:", error);
            return new NextResponse("Error al crear supply", { status: 500 });
        }
    
        return NextResponse.json({ status: 201 });
    } catch (error) {
        console.error("Error manejando POST:", error);
        return new NextResponse("Error al crear supply", { status: 500 });
    }
}

export const PUT = async (request: Request) => {
    try {
        const { id, name, description, year, supplystatus_id, supplytype_id } = await request.json();

        if (typeof id !== 'number' || typeof name !== 'string' || typeof description !== 'string' || typeof year !== 'number' || typeof supplystatus_id !== 'number' || typeof supplytype_id !== 'number' ) {
            return new NextResponse("Parametros no validos", {status: 400});
        }

        const query = {
            id, name, description, year, supplystatus_id, supplytype_id
        }

        try {
            await editSupply(query);
        } catch(error) {
            console.error("Error manejando PUT:", error);
            return new NextResponse("Error al editar usuario", { status: 500 });
        } 

        return NextResponse.json({ status: 200 });
    } catch(error) {
        console.error("Error manejando PUT:", error);
        return new NextResponse("Error al editar usuario", { status: 500 });
    }
}

export const DELETE = async (request: Request) => {
    try {
        const url = new URL(request.url);
        const idStr = url.searchParams.get('id');

        const id = idStr ? parseInt(idStr, 10) : null;

        if (typeof id !== 'number') {
            return new NextResponse("Mandaste cualquier parametro loco", { status: 400 });
        }

        try {
            await dropSupply(id)
        } catch(error) {
            console.error("Error manejando POST:", error);
            return new NextResponse("Error al eliminar instancia", { status: 500 });
        } 

        return new NextResponse("Instancia borrada", { status: 200 });
    } catch (error) {
        console.error("Error manejando DELETE:", error);
        return new NextResponse("Error manejando DELETE", { status: 500 });
    }
};