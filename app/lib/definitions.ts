export type Usertype = {
    id: number;
    name: string;
}

export type Laboratory = {
    id: number;
    name: string;
}

export type User = {   //Usuarios
    id: number;
    name: string;
    email: string;
    password: string;
    file: string;
    usertype_id: number;
    laboratory_id: number;
}

export type NewUser = {   //Usuarios
    name: string;
    email: string;
    password: string;
    file: string;
    usertype_id: number;
    laboratory_id: number;
}