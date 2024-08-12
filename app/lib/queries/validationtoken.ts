import { db } from '@vercel/postgres';

const client = db;

export async function createVerificationToken(token: string, email: string, expirationdate: Date){
    try {
        const expirationDateOnly = expirationdate.toISOString().split('T')[0];
        const result = await client.sql `
        INSERT INTO "verificationtoken" (email, token, expirationdate)
        VALUES (${email}, ${token}, ${expirationDateOnly})
        `;
        return {success: true}
    } catch (error) {
        console.error("Error de Base de Datos:", error);
        throw new Error("No se pudo crear el verificationtoken");
    }
}

export async function deleteVerificationToken(email: string) {
    try {
        return client.sql`
        DELETE FROM "verificationtoken"
        WHERE email = ${email}
        `;
    } catch(error) {
        console.error("Error de Base de Datos:", error);
        throw new Error("No se pudo eliminar el verificationtoken");
    }
}

export async function getVerificationTokenByEmail(email: string) {
    try {
        const result = await client.sql`
        SELECT * FROM "verificationtoken" WHERE email = ${email} LIMIT 1
        `;
        return result.rows[0];
    } catch (error) {
        console.error("Error de Base de Datos:", error);
        throw new Error("No se pudo obtener el verificationtoken");
    }
}

export async function getVerificationTokenByToken(token: string) {
    try {
        const result = await client.sql`
        SELECT * FROM "verificationtoken" WHERE token = ${token} LIMIT 1
        `;
        return result.rows[0];
    } catch (error) {
        console.error("Error de Base de Datos:", error);
        throw new Error("No se pudo obtener el verificationtoken");
    }
}