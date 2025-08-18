import type { User } from "../interfaces/User";

const urlApi = import.meta.env.VITE_API_URL;

export const updateUserProfile = async (userId: number, userData: Partial<User>) => {
    try {
        const response = await fetch(`${urlApi}/users/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}` // Si usas autenticación por token
            },
            body: JSON.stringify(userData),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Error al actualizar el perfil');
        }

        return data;
    } catch (error: any) {
        throw new Error(error.message || 'Error al conectar con el servidor');
    }
};

export const getUserById = async (userId: number) => {
    try {
        const response = await fetch(`${urlApi}/users/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}` // Si usas autenticación por token
            },
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Error al obtener el usuario');
        }

        return data;
    } catch (error: any) {
        throw new Error(error.message || 'Error al conectar con el servidor');
    }
};
