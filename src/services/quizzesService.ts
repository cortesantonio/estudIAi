import type { ParamsNewSession, SessionAnswered } from "../interfaces/Quizzes";


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

export const getQuizById = async (id: number) => {
    const urlApi = import.meta.env.VITE_API_URL;
    try {
        const response = await fetch(`${urlApi}/quizzes/get-game/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        });

        if (!response.ok) {
            throw new Error('Error al obtener el quiz');
        }

        return await response.json();
    } catch (error: any) {
        throw new Error(error.message || 'Error al conectar con el servidor');
    }
}

export const saveResult = async (resultado: SessionAnswered) => {
    const urlApi = import.meta.env.VITE_API_URL;
    try {
        const response = await fetch(`${urlApi}/quizzes/save-result`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(resultado),
        });

        if (!response.ok) {
            throw new Error('Error al guardar el resultado');
        }

        return await response.json();
    } catch (error: any) {
        throw new Error(error.message || 'Error al conectar con el servidor');
    }
}

export const getSessionAnswered = async (sessionId: number, userId: number) => {
    const urlApi = import.meta.env.VITE_API_URL;
    try {
        const response = await fetch(`${urlApi}/quizzes/get-session-answered`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ sessionId, userId })
        });

        if (!response.ok) {
            throw new Error('Error al obtener el resultado de la sesión');
        }

        return await response.json();
    } catch (error: any) {
        throw new Error(error.message || 'Error al conectar con el servidor');
    }
}   