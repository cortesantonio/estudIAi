import { useState, useEffect } from "react"
import type { User } from "../interfaces/User"
import { updateUserProfile } from "../services/userService"

interface EditProfileModalProps {
    isOpen: boolean
    onClose: () => void
    user: User | null
    onUserUpdate?: (updatedUser: User) => void
}

export const EditProfileModal = ({ isOpen, onClose, user, onUserUpdate }: EditProfileModalProps) => {
    const [formData, setFormData] = useState<Partial<User>>({
        name: "",
        email: "",
        career: ""
    })
    const [errors, setErrors] = useState<{ [key: string]: string }>({})
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [userData, setUserData] = useState<User | null>(null)

    const handleSaveProfile = async (updatedUser: User) => {
        try {
            // Llamar al servicio para actualizar el usuario en la base de datos
            const response = await updateUserProfile(updatedUser.id, updatedUser);
            console.log(response)

            // Si la actualización es exitosa, actualizar el estado local
            setUserData(response);
            localStorage.setItem("user", JSON.stringify(response));

            // Notificar al componente padre sobre la actualización
            if (onUserUpdate) {
                onUserUpdate(response);
            }

            // Opcional: Mostrar mensaje de éxito
            console.log('Perfil actualizado exitosamente');
        } catch (error: any) {
            // Manejar errores
            console.error('Error al actualizar el perfil:', error.message);
            // Opcional: Mostrar mensaje de error al usuario
            alert('Error al actualizar el perfil: ' + error.message);
            throw error; // Re-lanzar el error para que sea manejado en handleSubmit
        }
    }


    useEffect(() => {
        if (user) {
            setUserData(user);
            setFormData({
                name: user.name || "",
                email: user.email || "",
                career: user.career || "Sin especificar"
            })
            setErrors({})
        }
    }, [user])

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {}

        if (!formData.name?.trim()) {
            newErrors.name = "El nombre es requerido"
        } else if (formData.name?.trim().length < 2) {
            newErrors.name = "El nombre debe tener al menos 2 caracteres"
        }

        if (!formData.email?.trim()) {
            newErrors.email = "El email es requerido"
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email || "")) {
            newErrors.email = "El email no es válido"
        }

        if (!formData.career?.trim()) {
            newErrors.career = "La carrera es requerida"
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!validateForm() || !userData) return

        setIsSubmitting(true)

        try {
            const updatedUser: User = {
                ...userData,
                name: formData.name?.trim() || "",
                email: formData.email?.trim() || "",
                career: formData.career?.trim() || ""
            }

            await handleSaveProfile(updatedUser)
            onClose()
        } catch (error) {
            console.error("Error al guardar el perfil:", error)
            setErrors({ general: "Error al guardar los cambios. Inténtalo de nuevo." })
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))

        // Limpiar error del campo cuando el usuario empiece a escribir
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ""
            }))
        }
    }

    const handleClose = () => {
        setErrors({})
        setIsSubmitting(false)
        onClose()
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="relative w-full max-w-md mx-4 bg-white dark:bg-gray-800 rounded-2xl shadow-soft-xl">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Editar Perfil
                    </h3>
                    <button
                        onClick={handleClose}
                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                        disabled={isSubmitting}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6">
                    {/* Error general */}
                    {errors.general && (
                        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
                            {errors.general}
                        </div>
                    )}

                    <div className="space-y-4">
                        {/* Name Field */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Nombre <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors ${errors.name
                                    ? 'border-red-500 focus:ring-red-500'
                                    : 'border-gray-300 dark:border-gray-600'
                                    }`}
                                required
                                disabled={isSubmitting}
                            />
                            {errors.name && (
                                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name}</p>
                            )}
                        </div>

                        {/* Email Field */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Email <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors ${errors.email
                                    ? 'border-red-500 focus:ring-red-500'
                                    : 'border-gray-300 dark:border-gray-600'
                                    }`}
                                required
                                disabled={isSubmitting}
                            />
                            {errors.email && (
                                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email}</p>
                            )}
                        </div>

                        {/* Career Field */}
                        <div>
                            <label htmlFor="career" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Carrera <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="career"
                                name="career"
                                value={formData.career || ""}
                                onChange={handleChange}
                                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors ${errors.career
                                    ? 'border-red-500 focus:ring-red-500'
                                    : 'border-gray-300 dark:border-gray-600'
                                    }`}
                                required
                                disabled={isSubmitting}
                            />
                            {errors.career && (
                                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.career}</p>
                            )}
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end space-x-3 mt-6">
                        <button
                            type="button"
                            onClick={handleClose}
                            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-600 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-500 transition-colors disabled:opacity-50"
                            disabled={isSubmitting}
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-tl from-purple-700 to-pink-500 rounded-lg hover:saturate-50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Guardando...
                                </>
                            ) : (
                                'Guardar Cambios'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
