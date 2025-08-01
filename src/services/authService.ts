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
            throw new Error(data.message || 'Error en el login');
        }

        return data;
    } catch (error: any) {
        // Puedes loguearlo o usarlo como hook global
        throw new Error(error.message && 'Error al conectar con el servidor');
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
        // Puedes loguearlo o usarlo como hook global
        throw new Error(error.message && 'Error al conectar con el servidor');
    }
};