export const Steps = () => {
    return (
        <section className="bg-white lg:grid lg:h-screen lg:place-content-center dark:bg-gray-900 px-4" id="steps">
            <h1 className="text-2xl font-semibold text-gray-800  lg:text-3xl dark:text-white  mx-auto">
                ¿Cómo funciona EstudIAi?
            </h1>
            <ol
                className="mx-auto mt-20 max-w-screen-xl  sm:px-6 lg:px-8 relative space-y-8 before:absolute before:top-0 before:left-1/2 before:h-full before:w-0.5 before:-translate-x-1/2 before:rounded-full before:bg-gray-200 dark:before:bg-gray-700"
            >
                <li className="group relative grid grid-cols-2 odd:-me-3 even:-ms-3">
                    <div
                        className="relative flex items-start gap-4 group-odd:flex-row-reverse group-odd:text-right group-even:order-last -mt-0.5"
                    >
                        <span className="size-6 shrink-0 rounded-full bg-blue-600 flex justify-center items-center text-white ">1</span>
                        <div className="-mt-2">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Crea un grupo de estudio y sube el material</h3>
                            <p className="mt-0.5 text-sm text-gray-700 dark:text-gray-200">
                                Elige la materia, invita a tus compañeros y sube los documentos que entran en la prueba (PDF, DOCX o texto).
                            </p>
                        </div>
                    </div>
                    <div aria-hidden="true"></div>
                </li>
                <li className="group relative grid grid-cols-2 odd:-me-3 even:-ms-3">
                    <div
                        className="relative flex items-start gap-4 group-odd:flex-row-reverse group-odd:text-right group-even:order-last"
                    >
                        <span className="size-5 shrink-0 rounded-full bg-blue-600 flex justify-center items-center text-white font-bold">2</span>
                        <div className="-mt-2">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Genera preguntas automáticamente</h3>
                            <p className="mt-0.5 text-sm text-gray-700 dark:text-gray-200">
                                El sistema analiza el contenido y crea preguntas tipo quiz listas para practicar.
                            </p>
                        </div>
                    </div>
                    <div aria-hidden="true"></div>
                </li>
                <li className="group relative grid grid-cols-2 odd:-me-3 even:-ms-3">
                    <div
                        className="relative flex items-start gap-4 group-odd:flex-row-reverse group-odd:text-right group-even:order-last"
                    >
                        <span className="size-5 shrink-0 rounded-full bg-blue-600 flex justify-center items-center  text-white font-bold">3</span>
                        <div className="-mt-2">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Responde quizzes y compite en el ranking</h3>
                            <p className="mt-0.5 text-sm text-gray-700 dark:text-gray-200">
                                Practica con tus compañeros, revisa tus puntajes y mira tu posición en el ranking del grupo.
                            </p>
                        </div>
                    </div>
                    <div aria-hidden="true"></div>
                </li>
                <li className="group relative grid grid-cols-2 odd:-me-3 even:-ms-3">
                    <div
                        className="relative flex items-start gap-4 group-odd:flex-row-reverse group-odd:text-right group-even:order-last"
                    >
                        <span className="size-5 shrink-0 rounded-full bg-blue-600 flex justify-center items-center  text-white font-bold">4</span>
                        <div className="-mt-2">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Repite los quizzes y sigue tu progreso</h3>
                            <p className="mt-0.5 text-sm text-gray-700 dark:text-gray-200">
                                El grupo puede repetir las sesiones y ver estadísticas de avance para mejorar juntos.
                            </p>
                        </div>
                    </div>
                    <div aria-hidden="true"></div>
                </li>
            </ol>
        </section>
    )
}