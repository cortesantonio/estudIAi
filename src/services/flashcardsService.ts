export const getFlashcards = async (id: string) => {
    const urlApi = import.meta.env.VITE_API_URL;

    try {
        const response = await fetch(`${urlApi}/flashcards/getAllOf`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({ "studyGroupId": id }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Error en obtener las flashcards del grupo');
        }

        return data;
    } catch (error: any) {
        throw new Error(error.message || 'Error al conectar con el servidor');
    }
}

interface ParamsNewFlashcards {
    studyGroupId: number;
    quantity: number;

}
export const CreateFlashcards = async (input: ParamsNewFlashcards) => {
    const urlApi = import.meta.env.VITE_API_URL;

    try {
        const response = await fetch(`${urlApi}/flashcards`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify(input),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Error en crear las flashcards del grupo');
        }

        return data;
    } catch (error: any) {
        throw new Error(error.message || 'Error al conectar con el servidor');
    }
}