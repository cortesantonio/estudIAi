import type { User } from "./User"

export interface Group {
    id: number,
    hexColor: string,
    name: string,
    adminId?: number,
    isActive?: boolean,
    inviteCode?: number,

    admin?: User,
}
