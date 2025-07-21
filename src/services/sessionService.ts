export const getSessions = async (id: string) => {
    const urlApi = import.meta.env.VITE_API_URL;
    try {
        const response = await fetch(`${urlApi}/quizzes/get-session/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Error en obtener las sessiones de quizzes del grupo');
        }

        return data;
    } catch (error: any) {
        throw new Error(error.message || 'Error al conectar con el servidor');
    }
}
