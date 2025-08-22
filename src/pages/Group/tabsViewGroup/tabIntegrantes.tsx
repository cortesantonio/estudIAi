import type { Group } from "../../../interfaces/Group";
import type { GroupMember } from "../../../interfaces/GroupMember";

interface IntegrantesProps {
    group: Group;
    users: GroupMember[];
    isOpen: boolean;
}

export default function Integrantes({ group, users, isOpen }: IntegrantesProps) {
    if (!isOpen) return null;
    return (
        <div>
            <section>
                <h3 className="font-bold mb-4 dark:text-white">Integrantes del Grupo</h3>
                <ul className="grid md:grid-cols-3 gap-4">
                    {users.map((user) => (
                        <li className="bg-white dark:bg-gray-800 rounded shadow p-4 flex items-center gap-3">
                            <img src={user.user.avatarUrl || "/defaultAvatar.png"} className="w-10 h-10 rounded-full" alt="Avatar" />
                            <div>
                                <div className="text-xs text-gray-500">{user.role == "ADMIN" ? "Administrador" : "Miembro"}</div>

                                <div className="font-semibold dark:text-white">{user.user.name}</div>
                                <div className="text-xs text-gray-500">{user.user.email}</div>
                                <p className="text-xs text-gray-500">Se unió el {new Date(user.joinedAt).toLocaleDateString() + " a las " + new Date(user.joinedAt).toLocaleTimeString()}</p>
                            </div>
                        </li>
                    ))}

                </ul>
            </section>
        </div>
    )
}