import { db } from "@vercel/postgres";
import { GetMessages, NewMessage } from "../definitions";
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

const client = db;

export async function getMessages(sender_id: number, receiver_id: number) {
    try {
        const result = await client.sql`
        SELECT content, timestamp, sender_id, receiver_id
        FROM "message"
        WHERE (sender_id = ${sender_id} AND receiver_id = ${receiver_id})
            OR (sender_id = ${receiver_id} AND receiver_id = ${sender_id})
        ORDER BY timestamp ASC
        `;
        return result.rows as GetMessages[];
    } catch (error) {
        console.error("Error de Base de Datos:", error);
        throw new Error("No se pudo obtener el message");
    }
}

export async function createMessage(message: NewMessage) {
    try {
        const argentinaTimestamp = dayjs().tz('America/Argentina/Buenos_Aires').format();
        await client.sql`
        INSERT INTO "message" (content, sender_id, receiver_id, timestamp)
        VALUES (${message.content}, ${message.sender_id}, ${message.receiver_id}, ${argentinaTimestamp})
        `;
        return { success: true, message: "Instancia creada correctamente" };
    } catch (error) {
        console.error("Error de Base de Datos:", error);
        throw new Error("No se pudo crear el message");
    }    
}