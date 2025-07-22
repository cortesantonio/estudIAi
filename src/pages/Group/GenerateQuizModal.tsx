import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import type { ParamsNewSession } from "../../interfaces/Quizzes";
import { PacmanLoader } from "react-spinners";
import { CreateQuizzes } from "../../services/quizzesService";

interface GenerateQuizModalProps {
    isOpen: boolean;
    groupId?: number;
    onClose: () => void;
    onSuccess?: () => void;
}

export const GenerateQuizModal = ({ isOpen, onClose, onSuccess, groupId }: GenerateQuizModalProps) => {
    const [loading, setLoading] = useState(false)

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
        setValue,
    } = useForm<ParamsNewSession>();

    useEffect(() => {
        setValue("studyGroupId", groupId)
    }, [groupId])

    const [quantity, setQuantity] = useState(5); // Estado para el contador

    const handleClose = () => {
        reset();
        onClose();
    };

    const handleQuantityChange = (newVal: number) => {
        const clamped = Math.max(1, Math.min(15, newVal));
        setQuantity(clamped);
        setValue("quantity", clamped);
    };

    const onSubmit = async (data: ParamsNewSession) => {
        setLoading(true)
        try {
            const response = await CreateQuizzes(data)
            console.log(response)
            onSuccess?.()
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" role="dialog" aria-modal="true">
            {loading ? <div className="bg-white dark:bg-gray-900 w-fit px-15 py-10 rounded-2xl">
                <PacmanLoader className="mx-auto" color="#2563eb" />
                <p className="pt-3 dark:text-white text-black text-center">
                    Tu nuevo quiz está siendo generado por el modelo de IA. <br /> Por favor, espera un momento.
                </p>
            </div>
                : <>
                    <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl dark:bg-gray-900 relative animate-fade-in">
                        {/* Cerrar */}
                        <button
                            onClick={handleClose}
                            className="absolute top-3 right-3 rounded-full p-2 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-600 focus:outline-none"
                            aria-label="Cerrar"
                        >
                            <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        <form className="mt-2 flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                <svg xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 -960 960 960" width="32px" className="dark:fill-yellow-300 fill-yellow-500"><path d="M331-651 211-771l57-57 120 120-57 57Zm149-95v-170h80v170h-80Zm291 535L651-331l57-57 120 120-57 57Zm-63-440-57-57 120-120 57 57-120 120Zm38 171v-80h170v80H746ZM205-92 92-205q-12-12-12-28t12-28l363-364q35-35 85-35t85 35q35 35 35 85t-35 85L261-92q-12 12-28 12t-28-12Zm279-335-14.5-14-14.5-14-14-14-14-14 28 28 29 28ZM233-176l251-251-57-56-250 250 56 57Z" /></svg>
                                Ajusta los parametros de generación.
                            </h2>

                            {/* Documento (solo label) */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                                    Documento: Nombre del documento activo
                                </label>
                            </div>

                            {/* Título */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                                    Título del Quiz
                                </label>
                                <input
                                    type="text"
                                    {...register("title", { required: "Debe ingresar el título del quiz" })}
                                    className="w-full h-10 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white px-3 shadow-sm focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600"
                                />
                                {errors.title && <p className="text-red-400 text-xs mt-1">{errors.title.message}</p>}
                            </div>

                            {/* Tipos de preguntas */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                                    Tipos de preguntas
                                </label>
                                <div className="flex flex-col gap-2 pl-1">
                                    {["selección multiple", "verdadero y falso", "selección única", "respuesta corta"].map((type) => (
                                        <label key={type} className="inline-flex items-center">
                                            <input
                                                type="checkbox"
                                                value={type}
                                                {...register("typeOptions", {
                                                    required: "Debe seleccionar al menos un tipo de pregunta",
                                                })}
                                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
                                            />
                                            <span className="ml-2 text-sm text-gray-700 dark:text-gray-300 capitalize">{type}</span>
                                        </label>
                                    ))}
                                </div>
                                {errors.typeOptions && (
                                    <p className="text-red-500 text-xs mt-1">{errors.typeOptions.message}</p>
                                )}
                            </div>

                            {/* Cantidad */}
                            <div>
                                <label htmlFor="counter-input" className="block mb-1 text-sm font-medium text-gray-700 dark:text-white">
                                    Cantidad de preguntas
                                </label>
                                <div className="relative flex items-center gap-2">
                                    <button
                                        type="button"
                                        onClick={() => handleQuantityChange(quantity - 1)}
                                        className="w-7 h-7 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 flex items-center justify-center"
                                    >
                                        <svg className="w-3 h-3 text-gray-900 dark:text-white" viewBox="0 0 18 2">
                                            <path d="M1 1h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                        </svg>
                                    </button>
                                    <input
                                        type="text"
                                        value={quantity}
                                        readOnly
                                        {...register("quantity", {
                                            required: "Debe ingresar la cantidad de preguntas",
                                            min: { value: 1, message: "Debe ser al menos 1" },
                                            max: { value: 15, message: "El máximo de preguntas son 15" },
                                        })}
                                        className="w-12 text-center text-sm text-gray-900 dark:text-white bg-transparent border-0 focus:outline-none"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleQuantityChange(quantity + 1)}
                                        className="w-7 h-7 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 flex items-center justify-center"
                                    >
                                        <svg className="w-3 h-3 text-gray-900 dark:text-white" viewBox="0 0 18 18">
                                            <path d="M9 1v16M1 9h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                        </svg>
                                    </button>
                                </div>
                                {errors.quantity && <p className="text-red-400 text-xs mt-1">{errors.quantity.message}</p>}
                            </div>

                            {/* Enfoque */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                                    Enfoque
                                </label>
                                <select
                                    {...register("focusing", { required: "El enfoque es obligatorio" })}
                                    className="w-full h-10 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white px-3 shadow-sm focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600"
                                >
                                    <option value="">Selecciona un enfoque</option>
                                    <option value="conceptos del tema">Conceptos</option>
                                    <option value="generalidades">Generalidades</option>
                                    <option value="muy especificos">Muy específicos</option>
                                    <option value="variados">Variados (Conceptos, generalidades y muy específicos)</option>
                                </select>
                                {errors.focusing && (
                                    <p className="text-red-400 text-xs mt-1">{errors.focusing.message}</p>
                                )}
                            </div>
                            <div>
                                {loading && <p>cargando</p>}
                            </div>

                            <footer className="mt-4 flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={handleClose}
                                    className="rounded-lg bg-gray-100 px-5 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600"
                                >
                                    Generar
                                </button>
                            </footer>
                        </form>
                    </div>
                </>}

        </div>
    );
};
