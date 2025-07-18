import type { ParamsNewSession } from "../interfaces/Quizzes";


export const CreateQuizzes = async (datos: ParamsNewSession) => {
    const urlApi = import.meta.env.VITE_API_URL;
    try {
        const response = await fetch(`${urlApi}/quizzes/gen-with-ia`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(datos),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Error desconocido al crear el quiz.');
        }

        return data;
    } catch (error: any) {
        // Puedes loguearlo o usarlo como hook global
        throw new Error(error.message || 'Error al conectar con el servidor');
    }
}

