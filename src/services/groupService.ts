import type { Group } from "../interfaces/Group";

export const CreateGroup = async (datos: Group) => {
    const urlApi = import.meta.env.VITE_API_URL;
    try {
        const response = await fetch(`${urlApi}/study-group`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
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
        throw new Error(error.message || 'Error al conectar con el servidor');
    }
}

export const GetGroupsOf = async () => {
    const urlApi = import.meta.env.VITE_API_URL;
    try {
        const response = await fetch(`${urlApi}/study-group/find-all-of`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Error en el login');
        }

        return data;
    } catch (error: any) {
        // Puedes loguearlo o usarlo como hook global
        throw new Error(error.message || 'Error al conectar con el servidor');
    }
}

export const GetGroup = async (id:string) => {
    const urlApi = import.meta.env.VITE_API_URL;
    try {
        const response = await fetch(`${urlApi}/study-group/findOne/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Error en el login');
        }

        return data;
    } catch (error: any) {
        // Puedes loguearlo o usarlo como hook global
        throw new Error(error.message || 'Error al conectar con el servidor');
    }
}

export const GetMembersOfGroups = async (id: string) => {
    const urlApi = import.meta.env.VITE_API_URL;
    try {
        const response = await fetch(`${urlApi}/group-member/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Error en obtener los miembros del grupo');
        }

        return data;
    } catch (error: any) {
        throw new Error(error.message || 'Error al conectar con el servidor');
    }
}