import type { User } from "./User"
import type { Group } from "./Group"


export interface GroupMember {
    id: number,
    userId: number,
    studyGroupId: number,
    joinedAt: Date,
    studyGroup: Group,
    user: User
    role: "MEMBER" | "ADMIN"
}

