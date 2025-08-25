import type { Group } from "../../../interfaces/Group";
import type { GroupMember } from "../../../interfaces/GroupMember";

interface IntegrantesProps {
    group: Group;
    users: GroupMember[];
    isOpen: boolean;
}

export default function Integrantes({ group, users, isOpen }: IntegrantesProps) {
    if (!isOpen) return null;

    const getRoleIcon = (role: string) => {
        if (role === "ADMIN") {
            return (
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-gradient-to-r from-teal-400 to-blue-500 rounded-full animate-pulse"></div>
                    <span className="text-xs font-medium text-teal-600 dark:text-teal-400">Administrador</span>
                </div>
            );
        }
        return (
            <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Miembro</span>
            </div>
        );
    };

    const getRoleBadge = (role: string) => {
        if (role === "ADMIN") {
            return (
                <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r from-teal-50 to-blue-50 text-teal-700 dark:from-teal-900/30 dark:to-blue-900/30 dark:text-teal-300 border border-teal-200 dark:border-teal-700">
                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Admin
                </div>
            );
        }
        return (
            <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-600">
                <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                </svg>
                Miembro
            </div>
        );
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now.getTime() - date.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays === 1) {
            return "Hoy";
        } else if (diffDays === 2) {
            return "Ayer";
        } else if (diffDays <= 7) {
            return `Hace ${diffDays - 1} días`;
        } else {
            return date.toLocaleDateString('es-ES', { 
                day: 'numeric', 
                month: 'short',
                year: 'numeric'
            });
        }
    };

    return (
        <div className="space-y-6">
            {/* Header con estadísticas */}
            <div className="bg-gradient-to-r from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                            Integrantes del Grupo
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 mt-1">
                            {users.length} {users.length === 1 ? 'integrante' : 'integrantes'} en total
                        </p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-teal-600 dark:text-teal-400">
                                {users.filter(u => u.role === "ADMIN").length}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">Administradores</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                {users.filter(u => u.role !== "ADMIN").length}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">Miembros</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Lista de integrantes */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {users.map((user, index) => (
                    <div 
                        key={user.user.id} 
                        className="group relative bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:border-teal-200 dark:hover:border-teal-700 hover:scale-[1.02]"
                    >
                        {/* Indicador de rol en la esquina superior */}
                        <div className="absolute top-4 right-4">
                            {getRoleBadge(user.role)}
                        </div>

                        {/* Avatar y información principal */}
                        <div className="flex items-start gap-4 mb-4">
                            <div className="relative">
                                <img 
                                    src={user.user.avatarUrl === null ? "/defaultAvatar.webp" : user.user.avatarUrl} 
                                    className="w-16 h-16 rounded-full object-cover border-2 border-gray-200 dark:border-gray-600 shadow-sm" 
                                    alt={user.user.name}
                                    onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        target.src = "/defaultAvatar.webp";
                                    }}
                                />
                                {user.role === "ADMIN" && (
                                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-r from-teal-400 to-blue-500 rounded-full flex items-center justify-center border-2 border-white dark:border-gray-800">
                                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                )}
                            </div>
                            
                            <div className="flex-1 min-w-0">
                                <h4 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                                    {user.user.name}
                                </h4>
                                <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                                    {user.user.email}
                                </p>
                                {getRoleIcon(user.role)}
                            </div>
                        </div>

                        {/* Información adicional */}
                        <div className="space-y-3">
                            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <span>Se unió {formatDate(user.joinedAt)}</span>
                            </div>
                            
                            {user.role === "ADMIN" && (
                                <div className="flex items-center gap-2 text-sm text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-900/20 px-3 py-2 rounded-lg">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                                    </svg>
                                    <span className="font-medium">Líder del grupo</span>
                                </div>
                            )}
                        </div>

                        {/* Hover effect overlay */}
                        <div className="absolute inset-0 bg-gradient-to-r from-teal-50/0 to-blue-50/0 group-hover:from-teal-50/50 group-hover:to-blue-50/50 dark:group-hover:from-teal-900/10 dark:group-hover:to-blue-900/10 rounded-xl transition-all duration-300 pointer-events-none"></div>
                    </div>
                ))}
            </div>

            {/* Mensaje cuando no hay integrantes */}
            {users.length === 0 && (
                <div className="text-center py-12">
                    <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                        <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                        No hay integrantes aún
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400">
                        Invita a otros estudiantes a unirse a tu grupo de estudio
                    </p>
                </div>
            )}
        </div>
    );
}