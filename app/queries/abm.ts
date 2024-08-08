import { ABMcreate, NewSupplytype } from '../lib/definitions';
import { createSupplyType, getSupplyTypeByName, getSupplyTypes } from './supplytype';

export async function createInstance(query: ABMcreate) {
    try {
        const allowedTables = ["supplytype", "projecttype", "anotherType"]; // Adjust this list based on your actual tables
        if (!allowedTables.includes(query.table)) {
            throw new Error(`Invalid table name: ${query.table}`);
        }

        switch (query.table) {
            case "supplytype":
                const newSupplyType: NewSupplytype = {
                    name: query.name,
                };
                await createSupplyType(newSupplyType);
                break;
            // Add more cases as needed for other table types
            default:
                throw new Error(`No se puede manejar la tabla: ${query.table}`);
        }

        return { success: true };

    } catch (error) {
        console.error("Error de Base de Datos:", error);
        throw new Error("No se pudo crear instancia (profundo)");
    }
}

export async function getAllInstances(table: string) {
    let data;
    try {
        const allowedTables = ["supplytype", "projecttype", "anotherType"]; // Adjust this list based on your actual tables
        if (!allowedTables.includes(table)) {
            throw new Error(`Tabla no valida: ${table}`);
        }

        switch (table) {
            case "supplytype":
                data = await getSupplyTypes();
                break;
            // Add more cases as needed for other table types
            default:
                throw new Error(`No se puede manejar la tabla: ${table}`);
        }

        return data;

    } catch (error) {
        console.error("Error de Base de Datos:", error);
        throw new Error("No se pudo crear instancia (profundo)");
    }
}

export async function searchInstance(query: ABMcreate) {
    let data;
    try {
        const allowedTables = ["supplytype", "projecttype", "anotherType"]; // Adjust this list based on your actual tables
        if (!allowedTables.includes(query.table)) {
            throw new Error(`Tabla no valida: ${query.table}`);
        }

        switch (query.table) {
            case "supplytype":
                const name = query.name as string;
                data = await getSupplyTypeByName(name);
                break;
            // Add more cases as needed for other table types
            default:
                throw new Error(`No se puede manejar la tabla: ${query.table}`);
        }

        return data.rows;

    } catch (error) {
        console.error("Error de Base de Datos:", error);
        throw new Error("No se pudo crear instancia (profundo)");
    }
}