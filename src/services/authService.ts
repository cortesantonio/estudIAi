// services/authService.ts
import type { LoginInterface } from "../interfaces/Auth";

export const login = async (datos: LoginInterface) => {
    const urlApi = import.meta.env.VITE_API_URL;

    try {
        const response = await fetch(`${urlApi}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(datos),
        });

        const data = await response.json();

        if (!response.ok) {
            if (response.status == 401) {
                throw new Error('Usuario no existe o la contraseña es incorrecta');
            }
            throw new Error(data.message || 'Error en el login');
        }

        return data;
    } catch (error: any) {
        // Si ya tenemos un mensaje de error específico, lo usamos
        if (error.message) {
            throw error; // Re-lanzamos el error original con su mensaje
        }
        // Solo si no hay mensaje específico, lanzamos el error genérico
        throw new Error('Error al conectar con el servidor');
    }
};

export const registerUser = async (datos: LoginInterface) => {
    const urlApi = import.meta.env.VITE_API_URL;

    try {
        const response = await fetch(`${urlApi}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(datos),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Error en el registro');
        }

        return data;
    } catch (error: any) {
        // Si ya tenemos un mensaje de error específico, lo usamos
        if (error.message) {
            throw error; // Re-lanzamos el error original con su mensaje
        }
        // Solo si no hay mensaje específico, lanzamos el error genérico
        throw new Error('Error al conectar con el servidor');
    }
};

export const validateToken = async (token?: string): Promise<boolean> => {
    const urlApi = import.meta.env.VITE_API_URL;
    const bearerToken = token ?? localStorage.getItem('token');

    if (!bearerToken) return false;

    try {
        const response = await fetch(`${urlApi}/auth/isTokenValid`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${bearerToken}`
            },
        });

        if (response.status === 401 || response.status === 403) {
            return false;
        }

        if (!response.ok) {
            return false;
        }

        try {
            const data = await response.json();
            if (typeof data?.valid === 'boolean') {
                return data.valid;
            }
        } catch (_) {
            // Ignorar errores de parseo si la API no devuelve JSON
        }

        return true;
    } catch (_error) {
        return false;
    }
};