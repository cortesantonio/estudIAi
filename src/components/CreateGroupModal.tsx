import { useForm } from "react-hook-form";
import type { Group } from "../interfaces/Group";
import { CreateGroup } from "../services/groupService";

interface CreateGroupModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess?: () => void;
}

export const CreateGroupModal = ({ isOpen, onClose, onSuccess }: CreateGroupModalProps) => {
    const {
        register,
        handleSubmit,
        reset, 
        formState: { errors },
    } = useForm<Group>();

    const onSubmit = async (data: Group) => {
        try {
            const response = await CreateGroup(data);
            console.log(response);
            reset();
            onClose();
            onSuccess?.();
        } catch (error) {
            console.log(error);
        }
    };

    const handleClose = () => {
        reset();
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modalTitle"
        >
            <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl dark:bg-gray-900 relative animate-fade-in">
                <button
                    onClick={handleClose}
                    type="button"
                    className="absolute top-3 right-3 rounded-full p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 focus:outline-none dark:text-gray-500 dark:hover:bg-gray-800 dark:hover:text-gray-300"
                    aria-label="Cerrar"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="size-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>
                <form className="mt-2 flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
                    <h2 id="modalTitle" className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                        Nuevo grupo de estudio
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">
                        Completa la información para crear tu grupo.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3">
                        <div className="flex flex-col items-start">
                            <label className="mb-1 text-sm font-medium text-gray-700 dark:text-gray-200">
                                Color
                            </label>
                            <input
                                type="color"
                                defaultValue="#ffffff"
                                className="w-10 h-10 p-0 border-2 border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600 transition-all"
                                {...register("hexColor", { required: "El color es obligatorio" })}
                            />
                            {errors.hexColor && (
                                <p className="text-red-400 text-xs mt-1">{errors.hexColor.message}</p>
                            )}
                        </div>
                        <div className="flex-1">
                            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-200">
                                Nombre del grupo
                            </label>
                            <input
                                type="text"
                                id="name"
                                className="w-full h-10 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white px-3 shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 dark:focus:ring-blue-600 dark:focus:border-blue-600 transition-all"
                                {...register("name", { required: "El nombre es obligatorio" })}
                                placeholder="Ej: Matemáticas Avanzadas"
                            />
                            {errors.name && (
                                <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>
                            )}
                        </div>
                    </div>
                    <footer className="mt-4 flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={handleClose}
                            className="rounded-lg bg-gray-100 px-5 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600"
                        >
                            Crear
                        </button>
                    </footer>
                </form>
            </div>
        </div>
    );
}; 