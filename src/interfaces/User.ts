export interface User {
    id: number,
    email: string,
    avatarUrl: string,
    birthdate: string,
    name: string,
    career?: string,
    password?: string

    admin?: User;
}
