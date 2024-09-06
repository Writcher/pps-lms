import { db } from '@vercel/postgres';
import { supplyType, newSupplyType } from '../dtos/supplytype';

const client = db;

export async function getSupplyTypes() {
    try {
        const result = await client.sql`
        SELECT * FROM "supplytype"
        `;
        return result.rows as supplyType[];
    } catch (error) {
        console.error("Error de Base de Datos:", error);
        throw new Error("No se pudo obtener el supplytype");
    }
}

export async function getSupplyTypeByName(name: string) {
    try {
        const result = await client.sql`
        SELECT * FROM "supplytype"
        WHERE name ILIKE ${`%${name}%`}
        `;
        return result;
    } catch (error) {
        console.error("Error de Base de Datos:", error);
        throw new Error("No se pudo obtener el supplytype");
    }
}

export async function createSupplyType(supplytype: newSupplyType) {
    try {
        return client.sql`
        INSERT INTO "supplytype" (name)
        VALUES (${supplytype.name})
        `;
    } catch(error) {
        console.error("Error de Base de Datos:", error);
        throw new Error("No se pudo crear el supplytype");
    }
}

export async function dropSupplyType(id: number) {
    try {
        return client.sql`
        DELETE FROM "supplytype"
        WHERE id = ${id}
        `;
    } catch(error) {
        console.error("Error de Base de Datos:", error);
        throw new Error("No se pudo eliminar el supplytype");
    }
}

export async function updateSupplyType(supplytype: supplyType) {
    try {
        return client.sql`
        UPDATE "supplytype"
        SET name = ${supplytype.name}
        WHERE id = ${supplytype.id}
        `;
    } catch(error) {
        console.error("Error de Base de Datos:", error);
        throw new Error("No se pudo editar el supplytype");
    }
}