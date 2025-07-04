export const Features = () => {
    
    return (
        <section className="bg-white dark:bg-gray-900" id="features">
            <div className="container px-6 py-10 mx-auto">
                <h1 className="text-2xl font-semibold text-gray-800  lg:text-3xl dark:text-white">¿Por qué usar <span className="underline decoration-blue-500">EstudIAi</span>?</h1>

                <p className="mt-4 text-gray-500 xl:mt-6 dark:text-gray-300">
                    La forma más inteligente y colaborativa de prepararte para tus exámenes.
                </p>

                <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-12 xl:gap-12 md:grid-cols-2 xl:grid-cols-3">
                    <div className="p-8 space-y-3 border-2 border-blue-400 dark:border-blue-300 rounded-xl">
                        <span className="inline-block text-blue-500 dark:text-blue-400">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m9-6a4 4 0 11-8 0 4 4 0 018 0zm6 6a4 4 0 00-3-3.87" /></svg>
                        </span>
                        <h1 className="text-xl font-semibold text-gray-700 capitalize dark:text-white">Crea grupos y sube tus apuntes</h1>
                        <p className="text-gray-500 dark:text-gray-300">
                            Organiza a tus compañeros, crea un grupo y sube documentos (PDF, DOCX o texto) con el contenido de la materia.
                        </p>
                    </div>
                    <div className="p-8 space-y-3 border-2 border-blue-400 dark:border-blue-300 rounded-xl">
                        <span className="inline-block text-blue-500 dark:text-blue-400">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 14h.01M16 10h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" /></svg>
                        </span>
                        <h1 className="text-xl font-semibold text-gray-700 capitalize dark:text-white">Preguntas automáticas</h1>
                        <p className="text-gray-500 dark:text-gray-300">
                            El sistema analiza el contenido y genera preguntas tipo quiz para que practiques de forma personalizada.
                        </p>
                    </div>
                    <div className="p-8 space-y-3 border-2 border-blue-400 dark:border-blue-300 rounded-xl">
                        <span className="inline-block text-blue-500 dark:text-blue-400">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 -5 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 17v-2a4 4 0 014-4h10a4 4 0 014 4v2M12 7a4 4 0 100-8 4 4 0 000 8z" /></svg>
                        </span>
                        <h1 className="text-xl font-semibold text-gray-700 capitalize dark:text-white">Ranking y progreso</h1>
                        <p className="text-gray-500 dark:text-gray-300">
                            Responde quizzes, revisa tus puntajes y compite en el ranking del grupo. ¡Repite los quizzes y sigue tu avance!
                        </p>
                    </div>
                </div>
            </div>
            
        </section>
    )

}