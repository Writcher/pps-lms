import { ABMcreate, ABMdelete, ABMedit, Grade, NewGrade, NewProjecttype, NewScolarchiptype, NewSupplystatus, NewSupplytype, NewUsercareer, Projectstatus, Projecttype, Scolarshiptype, Supplystatus, Supplytype, Usercareer } from '../lib/definitions';
import { createGrade, dropGrade, getGradeByName, getGrades, updateGrade} from './queries/grade';
import { createProjectStatus, dropProjectStatus, getProjectStatusByName, getProjectStatuses, updateProjectStatus } from './queries/projectstatus';
import { createProjectType, dropProjectType, getProjectTypeByName, getProjectTypes, updateProjectType } from './queries/projecttype';
import { createScolarshipType, dropScolarshipType, getScolarshipTypeByName, getScolarshipTypes, updateScolarshipType } from './queries/scholarshiptype';
import { createSupplyStatus, dropSupplyStatus, getSupplyStatusByName, getSupplyStatuses, updateSupplyStatus } from './queries/supplystatus';
import { createSupplyType, dropSupplyType, getSupplyTypeByName, getSupplyTypes, updateSupplyType } from './queries/supplytype';
import { createUserCareer, dropUserCareer, getUserCareerByName, getUserCareers, updateUserCareer } from './queries/usercareer';

export async function createInstance(query: ABMcreate) {
    try {
        const allowedTables = ["supplytype", "supplystatus", "projecttype", "projectstatus", "scholarshiptype", "grade", "usercareer"];
        if (!allowedTables.includes(query.table)) {
            throw new Error(`Tabla no valida: ${query.table}`);
        }

        switch (query.table) {
            case "supplytype":
                const newSupplyType: NewSupplytype = {
                    name: query.name,
                };
                await createSupplyType(newSupplyType);
                break;
            case "supplystatus":
                const newSupplyStatus: NewSupplystatus = {
                    name: query.name,
                };
                await createSupplyStatus(newSupplyStatus);
                break;
            case "projecttype":
                const newProjectType: NewProjecttype = {
                    name: query.name,
                }
                await createProjectType(newProjectType);
                break;
            case "projectstatus":
                const newProjectStatus: NewSupplystatus = {
                    name: query.name,
                }
                await createProjectStatus(newProjectStatus);
                break;
            case "scholarshiptype":
                const newScolarshipType: NewScolarchiptype = {
                    name: query.name,
                }
                await createScolarshipType(newScolarshipType);
                break;
            case "grade":
                const newGrade: NewGrade = {
                    name: query.name,
                }
                await createGrade(newGrade);
            case "usercareer":
                const newUsercareer: NewUsercareer = {
                    name: query.name,
                }
                await createUserCareer(newUsercareer);
                break;
            default:
                throw new Error(`No se puede manejar la tabla: ${query.table}`);
        }

        return { success: true };

    } catch (error) {
        console.error("Error de Base de Datos:", error);
        throw new Error("No se pudo crear instancia (profundo)");
    }
}

{/*export async function deleteInstance(query: ABMdelete) {
    try {
        const allowedTables = ["supplytype", "supplystatus", "projecttype", "projectstatus", "scholarshiptype", "grade", "usercareer"];
        if (!allowedTables.includes(query.table)) {
            throw new Error(`Tabla no valida: ${query.table}`);
        }

        switch (query.table) {
            case "supplytype":
                await dropSupplyType(query.id);
                break;
            case "supplystatus":
                await dropSupplyStatus(query.id);
                break;
            case "projecttype":
                await dropProjectType(query.id);
                break;
            case "projectstatus":
                await dropProjectStatus(query.id);
                break;
            case "scholarshiptype":
                await dropScolarshipType(query.id);
                break;
            case "grade":
                await dropGrade(query.id);
                break;
            case "usercareer":
                await dropUserCareer(query.id);
                break;
            default:
                throw new Error(`No se puede manejar la tabla: ${query.table}`);
        }

        return { success: true };

    } catch (error) {
        console.error("Error de Base de Datos:", error);
        throw new Error("Error al eliminar la tabla (profundo)");
    }
}*/}

export async function editInstance(query: ABMedit) {
    try {
        const allowedTables = ["supplytype", "supplystatus", "projecttype", "projectstatus", "scholarshiptype", "grade", "usercareer"];
        if (!allowedTables.includes(query.table)) {
            throw new Error(`Tabla no valida: ${query.table}`);
        }

        switch (query.table) {
            case "supplytype":
                const editSupplyType: Supplytype = {
                    name: query.name,
                    id: query.id
                };
                await updateSupplyType(editSupplyType);
                break;
            case "supplystatus":
                const editSupplyStatus: Supplystatus = {
                    name: query.name,
                    id: query.id
                };
                await updateSupplyStatus(editSupplyStatus);
                break;
            case "projecttype":
                const editProjectType: Projecttype = {
                    name: query.name,
                    id: query.id
                }
                await updateProjectType(editProjectType);
                break;
            case "projectstatus":
                const editProjectStatus: Projectstatus = {
                    name: query.name,
                    id: query.id
                }
                await updateProjectStatus(editProjectStatus);
                break;
            case "scholarshiptype":
                const editScolarshipType: Scolarshiptype = {
                    name: query.name,
                    id: query.id
                }
                await updateScolarshipType(editScolarshipType);
                break;
            case "grade":
                const editGrade: Grade = {
                    name: query.name,
                    id: query.id    
                }
                await updateGrade(editGrade);
                break;
            case "usercareer":
                const editUsercareer: Usercareer = {
                    name: query.name,
                    id: query.id    
                }
                await updateUserCareer(editUsercareer);
                break;
            default:
                throw new Error(`No se puede manejar la tabla: ${query.table}`);
        }

        return { success: true };

    } catch (error) {
        console.error("Error de Base de Datos:", error);
        throw new Error("No se pudo editar instancia (profundo)");
    }
}

export async function getAllInstances(table: string) {
    let data;
    try {
        const allowedTables = ["supplytype", "supplystatus", "projecttype", "projectstatus", "scholarshiptype", "grade", "usercareer"];
        if (!allowedTables.includes(table)) {
            throw new Error(`Tabla no valida: ${table}`);
        }

        switch (table) {
            case "supplytype":
                data = await getSupplyTypes();
                break;
            case "supplystatus":
                data = await getSupplyStatuses();
                break;
            case "projecttype":
                data = await getProjectTypes();
                break;
            case "projectstatus":
                data = await getProjectStatuses();
                break;
            case "scholarshiptype":
                data = await getScolarshipTypes();
                break;
            case "grade":
                data = await getGrades();
                break;
            case "usercareer":
                data = await getUserCareers();
                break;
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
    let name;
    try {
        const allowedTables = ["supplytype", "supplystatus", "projecttype", "projectstatus", "scholarshiptype", "grade", "usercareer"];
        if (!allowedTables.includes(query.table)) {
            throw new Error(`Tabla no valida: ${query.table}`);
        }

        switch (query.table) {
            case "supplytype":
                name = query.name as string;
                data = await getSupplyTypeByName(name);
                break;
            case "supplystatus":
                name = query.name as string;
                data = await getSupplyStatusByName(name);
                break;
            case "projecttype":
                name = query.name as string;
                data = await getProjectTypeByName(name);
                break;
            case "projectstatus":
                name = query.name as string;
                data = await getProjectStatusByName(name);
                break;
            case "scholarshiptype":
                name = query.name as string;
                data = await getScolarshipTypeByName(name);
                break;
            case "grade":
                name = query.name as string;
                data = await getGradeByName(name);
                break;
            case "usercareer":
                name = query.name as string;
                data = await getUserCareerByName(name);
                break;
            default:
                throw new Error(`No se puede manejar la tabla: ${query.table}`);
        }

        return data.rows;

    } catch (error) {
        console.error("Error de Base de Datos:", error);
        throw new Error("No se pudo crear instancia (profundo)");
    }
}