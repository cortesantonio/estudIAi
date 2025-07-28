import type { Document } from "../interfaces/Document";

export const registerDocument = async (document: Document) => {
    const urlApi = import.meta.env.VITE_API_URL;

    try {
        const response = await fetch(`${urlApi}/document`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(document),
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Error en el registro');
        }
        return data
    } catch (error: any) {
        throw new Error(error.message || 'Error al conectar con el servidor');

    }


}

export const getDocument = async (id: string) => {
    const urlApi = import.meta.env.VITE_API_URL;

    try {
        const response = await fetch(`${urlApi}/document/get`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "studyGroupId": id }),
        });

        // Leemos el cuerpo como texto
        const rawText = await response.text();
        const data = rawText ? JSON.parse(rawText) : null;

        // Manejo de errores HTTP
        if (!response.ok) {
            throw new Error(data?.message || 'Error en la obtención');
        }

        // Si no hay datos (null o vacío)
        if (!data) return null;

        // Si el backend retorna un array y está vacío
        if (Array.isArray(data) && data.length === 0) return {};

        return data;
    } catch (error: any) {
        throw new Error(error.message || 'Error al conectar con el servidor');
    }
};

