import { useState } from "react";
import { useForm } from "react-hook-form";
import { PacmanLoader } from "react-spinners";
import { CreateFlashcards } from "../../services/flashcardsService";

interface GenerateQuizModalProps {
    isOpen: boolean;
    groupId: number;
    onClose: () => void;
    onSuccess?: () => void;
}

interface ParamsNewFlashcards {
    studyGroupId: number;
    quantity: number;

}

export const GenerateFlashcards = ({ isOpen, onClose, onSuccess, groupId }: GenerateQuizModalProps) => {
    const [loading, setLoading] = useState(false)

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
        setValue,
    } = useForm<ParamsNewFlashcards>();

    setValue("studyGroupId", groupId)

    const [quantity, setQuantity] = useState(5);

    const handleClose = () => {
        reset();
        onClose();
    };

    const handleQuantityChange = (newVal: number) => {
        const clamped = Math.max(1, Math.min(15, newVal));
        setQuantity(clamped);
        setValue("quantity", clamped);
    };

    const onSubmit = async (data: ParamsNewFlashcards) => {
        setLoading(true)
        try {
            const response = await CreateFlashcards(data)
            console.log(response)
            setLoading(false)
            onSuccess?.()


        } catch (error) {
            console.error("Error al crear las flashcards:", error);
            alert("Error al crear las flashcards. Por favor, inténtalo de nuevo más tarde.");
            setLoading(false)

        }

    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" role="dialog" aria-modal="true">
            {loading ? <div className="bg-white dark:bg-gray-900 w-fit px-15 py-10 rounded-2xl">
                <PacmanLoader className="mx-auto" color="#2563eb" />
                <p className="pt-3 dark:text-white text-black text-center">
                    Tus flashcards están siendo generadas por el modelo de IA. <br /> Por favor, espera un momento.
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
                            <h2 className="text-2xl  text-gray-900 dark:text-white">
                                <span className="font-bold">¡Estás a un paso!</span> Ingresa la cantidad de flashcards que deseas generar.
                            </h2>

                            {/* Documento (solo label) */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                                    Documento: Nombre del documento activo
                                </label>
                            </div>



                            {/* Cantidad */}
                            <div className="mx-auto">
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
