import type { flashcards } from "../../../interfaces/Flashcards"
import { useState } from "react"
import type { Group } from "../../../interfaces/Group";

import { useNavigate } from "react-router-dom";
import type { SessionWithAnswer } from "../../../interfaces/Quizzes";

interface QuizzesProps {
    isOpen: boolean;
    group?: Group;
    modalQuizzesIsOpen: () => void;
    modalFlashcardsIsOpen: () => void;
    quizzes: SessionWithAnswer[];
    flashcards: flashcards[];
    loadingFlashcards: boolean;
    loadingQuizzes: boolean;

}

export default function Quizzes({ isOpen,
    modalQuizzesIsOpen, modalFlashcardsIsOpen, quizzes, flashcards, loadingFlashcards, loadingQuizzes }: QuizzesProps) {
    if (!isOpen) { return null; }


    const [showFlashcards, setShowFlashcards] = useState<number[]>([])
    const navigate = useNavigate();



    const SkeletonCard = () => {
        return (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex flex-col gap-2 min-w-[250px] sm:min-w-[350px]">
                <div className="h-6 w-full bg-gray-500 rounded-lg animate-pulse"></div>
                <div className="h-5 w-2/3 bg-gray-500 rounded-lg animate-pulse"></div>
                <div className="h-4 w-1/3 bg-gray-500 rounded-lg animate-pulse"></div>

                <div className="w-30 h-7  bg-blue-600/70 text-white rounded text-sm flex gap-1 items-center justify-center cursor-pointer">

                </div>
            </div>
        )
    }
    const SkeletonCardFlashcards = () => {
        return (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-2 py-6 flex flex-col justify-between items-center gap-2 min-w-[200px] sm:min-w-[300px]  max-w-sm min-h-40">
                <div className=" flex flex-col   w-full gap-2">
                    <div className="h-6 w-full bg-gray-700 rounded-lg animate-pulse"></div>
                    <div className="h-6 w-3/4 mx-auto bg-gray-700 rounded-lg animate-pulse"></div>
                </div>
                <div className="h-7 w-2/5 bg-gray-700 rounded-lg animate-pulse"></div>
            </div>
        )
    }
    const handleShowFlashcards = (idFlashcard: number) => {
        if (!showFlashcards.includes(idFlashcard)) {
            setShowFlashcards([...showFlashcards, idFlashcard])
        } else {
            setShowFlashcards(showFlashcards.filter(id => id !== idFlashcard))
        }

    }



    return (

        <section className="flex flex-col gap-8">
            {/* Quizzes Disponibles */}
            <div>
                <div className="mb-4 flex gap-4 items-center justify-between lg:justify-start ">
                    <h3 className="font-bold text-xl dark:text-white">Quizzes Disponibles</h3>
                    
                    <button className="px-3 py-2 sm:w-50 bg-blue-600 hover:bg-blue-700  text-white rounded-lg font-semibold shadow transition-colors text-sm flex justify-center items-center gap-2 cursor-pointer"
                        title="Generar quizzes con ia" onClick={() => modalQuizzesIsOpen()}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="#fff"><path d="M331-651 211-771l57-57 120 120-57 57Zm149-95v-170h80v170h-80Zm291 535L651-331l57-57 120 120-57 57Zm-63-440-57-57 120-120 57 57-120 120Zm38 171v-80h170v80H746ZM205-92 92-205q-12-12-12-28t12-28l363-364q35-35 85-35t85 35q35 35 35 85t-35 85L261-92q-12 12-28 12t-28-12Zm279-335-14.5-14-14.5-14-14-14-14-14 28 28 29 28ZM233-176l251-251-57-56-250 250 56 57Z" /></svg>
                        Generar con IA
                    </button>
                </div>

                <div className="flex gap-4 overflow-auto pb-2 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:rounded-lg [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:rounded-lg [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-gray-600  dark:[&::-webkit-scrollbar-thumb]:bg-gray-800 ">
                    {loadingQuizzes && Array.from({ length: 3 }).map((_, id) => <SkeletonCard key={id} />)}
                    {!loadingQuizzes && quizzes && quizzes.map((quiz) => (
                        <div key={quiz?.id} className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex flex-col justify-between gap-2 min-w-[250px] sm:min-w-[350px] max-w-1/3">
                            <h4 className="font-semibold dark:text-white ">{quiz?.title}</h4>
                            <p className="text-sm text-gray-600 dark:text-white">{quiz?.description}</p>
                            <div className="flex flex-wrap gap-2 text-xs text-gray-500 dark:text-gray-400">
                                <span className="font-semibold">Duración: {quiz?.duration || 0} min</span>
                            </div>
                            <div className="flex flex-wrap gap-2 text-xs text-gray-500 dark:text-gray-400">
                                <p>
                                    Creado a las <span className="font-bold">{quiz?.createdAt?.toString().slice(11, 19)}</span>hrs. El <span className="font-bold">{quiz?.createdAt?.toString().slice(0, 10)}</span>
                                </p>
                            </div>

                            {/* Mostrar resultado si ya se respondió */}
                            {quiz?.isAnswered && (
                                <div className="flex items-center gap-2 p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#75FB4C">
                                        <path d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
                                    </svg>
                                    <span className="text-sm font-medium text-green-800 dark:text-green-200">
                                        Completado - Puntuación: {quiz?.score || 0}{quiz?.totalQuestions ? `/${quiz.totalQuestions}` : ''}
                                    </span>
                                </div>
                            )}

                            {!quiz?.isAnswered && (
                                <button
                                    className={`px-3 py-1 text-white rounded text-sm w-fit flex gap-1 items-center cursor-pointer ${quiz?.isAnswered
                                        ? 'bg-gray-400 cursor-not-allowed'
                                        : 'bg-blue-600 hover:bg-blue-700'
                                        }`}
                                    onClick={() => {
                                        if (!quiz?.isAnswered) {
                                            navigate(`/play/${quiz?.id}`)
                                        }
                                    }}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                    Iniciar Quiz
                                </button>
                            )}
                        </div>
                    ))}

                    {!loadingQuizzes && quizzes?.length === 0 && (
                        <div onClick={() => modalQuizzesIsOpen()} className="bg-white dark:bg-gray-800 dark:hover:bg-gray-900 rounded-lg shadow p-2 py-6 flex flex-col justify-between items-center gap-2 min-w-[200px] sm:min-w-[300px]  max-w-sm min-h-40 cursor-pointer hover:bg-gray-200 duration-200 transition-all">
                            <svg xmlns="http://www.w3.org/2000/svg" height="64px" viewBox="0 -960 960 960" width="64px" className="dark:fill-white fill-gray-800   ">
                                <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" /></svg>
                            <p className="text-center dark:text-white">
                                ¡Ups! Aún no hay quizzes disponibles. <br />
                                <span className="font-semibold">¡Crea uno ahora!</span>
                            </p>
                        </div>

                    )}


                </div>
            </div>

            {/* Flashcards / Modo Práctica */}
            <div>
                <h3 className="font-bold mb-2 text-xl dark:text-white">Flashcards ({flashcards?.length || 0})</h3>
                <div className="flex gap-4 overflow-auto pb-2 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:rounded-lg [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:rounded-lg [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-gray-600  dark:[&::-webkit-scrollbar-thumb]:bg-gray-800 ">

                    {flashcards && flashcards.map((flashcard) => {
                        const isFlipped = showFlashcards.includes(flashcard.id)
                        return (
                            <div key={flashcard?.id} className="group relative min-w-[220px] sm:min-w-[320px] max-w-sm">
                                <div className="relative h-44 sm:h-52 [perspective:1000px]" onClick={() => { handleShowFlashcards(flashcard.id) }}>
                                    <div className={`relative h-full w-full transition-transform duration-500 [transform-style:preserve-3d] ${isFlipped ? '[transform:rotateY(180deg)]' : ''}`}>
                                        {/* Front (Pregunta) */}
                                        <div className="absolute inset-0 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm p-4 flex flex-col gap-3 [backface-visibility:hidden]">
                                            <div
                                                className="flex text-center justify-center items-center h-full"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                <span className="font-semibold dark:text-white whitespace-pre-wrap break-words">{flashcard?.question}</span>
                                            </div>
                                            <div>
                                                <span className="text-xs text-gray-500 dark:text-gray-400 text-center">Desplázate para leer todo •</span> <span className="text-xs text-blue-600 dark:text-blue-400 text-center cursor-pointer">Toca para ver respuesta</span>

                                            </div>
                                        </div>
                                        {/* Back (Respuesta) */}
                                        <div className="absolute inset-0 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm p-4 flex flex-col gap-3 [backface-visibility:hidden] [transform:rotateY(180deg)]">
                                            <div
                                                className="flex-1 overflow-y-auto text-center pr-1 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:rounded-lg [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:rounded-lg [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-gray-800  dark:[&::-webkit-scrollbar-thumb]:bg-gray-600"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                <span className="font-semibold dark:text-white whitespace-pre-wrap break-words">{flashcard?.answer}</span>
                                            </div>
                                            <div>
                                                <span className="text-xs text-gray-500 dark:text-gray-400 text-center">Desplázate para leer todo •</span> <span className="text-xs text-blue-600 dark:text-blue-400 text-center cursor-pointer">Toca para ver pregunta</span>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    className="absolute top-2 right-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-2 shadow transition-colors cursor-pointer"
                                    title={isFlipped ? 'Ver pregunta' : 'Ver respuesta'}
                                    onClick={(e) => { e.stopPropagation(); handleShowFlashcards(flashcard.id) }}
                                    aria-label={isFlipped ? 'Ver pregunta' : 'Ver respuesta'}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                                        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                                        <path d="M22 2 12 12" />
                                    </svg>
                                </button>
                            </div>
                        )
                    })}

                    {loadingFlashcards && Array.from({ length: 3 }).map((_, id) => (<SkeletonCardFlashcards key={id} />))}

                    {!loadingFlashcards && flashcards?.length === 0 && (
                        <div onClick={() => modalFlashcardsIsOpen()} className="bg-white dark:bg-gray-800 dark:hover:bg-gray-900 rounded-lg shadow p-2 py-6 flex flex-col justify-between items-center gap-2 min-w-[200px] sm:min-w-[300px]  max-w-sm min-h-40 cursor-pointer hover:bg-gray-200 duration-200 transition-all">
                            <svg xmlns="http://www.w3.org/2000/svg" height="64px" viewBox="0 -960 960 960" width="64px" className="dark:fill-white fill-gray-800   ">
                                <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" /></svg>
                            <p className="text-center dark:text-white">¡Ups! Aún no hay flashcards. <br /> <span className="font-semibold">¡Créalas ahora!</span> </p>
                        </div>)}
                </div>
            </div>
            {/* Historial de Quizzes */}
            <div>
                <h3 className="font-bold text-xl dark:text-white mb-2">Historial de Quizzes</h3>

                <div className="overflow-x-auto  border border-gray-300 shadow-sm dark:border-gray-600 bg-white dark:bg-gray-800 rounded-lg ">
                    <table className="min-w-full divide-y-2 divide-gray-200 dark:divide-gray-700">
                        <thead className="ltr:text-left rtl:text-right">
                            <tr className="*:font-medium *:text-gray-900 dark:*:text-white">
                                <th className="px-3 py-2 whitespace-nowrap">Quiz</th>
                                <th className="px-3 py-2 whitespace-nowrap">Fecha</th>
                                <th className="px-3 py-2 whitespace-nowrap">Puntuación</th>
                                <th className="px-3 py-2 whitespace-nowrap">Revisar</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                            {quizzes.filter(quiz => quiz.isAnswered).map((quiz) => (
                                <tr key={quiz.id} className="*:text-gray-900 *:first:font-medium dark:*:text-white">
                                    <td className="px-3 py-2 whitespace-nowrap">{quiz.title}</td>
                                    <td className="px-3 py-2 whitespace-nowrap">
                                        {quiz.answeredAt ? new Date(quiz.answeredAt).toLocaleDateString('es-ES') : 'N/A'}
                                    </td>
                                    <td className="px-3 py-2 whitespace-nowrap">
                                        <p className="flex gap-2 items-center">
                                            {quiz.score || 0}{quiz.totalQuestions ? `/${quiz.totalQuestions}` : ''} puntos
                                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#75FB4C">
                                                <path d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
                                            </svg>
                                        </p>
                                    </td>
                                    {/*  <td className="px-3 py-2 whitespace-nowrap">
                                        <button
                                            className="hover:bg-gray-300 dark:hover:bg-gray-600 p-1 rounded-full cursor-pointer"
                                            onClick={() => navigate(`/results/${quiz.id}`)}
                                            title="Ver resultados detallados"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" className="dark:fill-white fill-black">
                                                <path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z" />
                                            </svg>
                                        </button>
                                    </td> */}
                                </tr>
                            ))}

                            {quizzes.filter(quiz => quiz.isAnswered).length === 0 && (
                                <tr>
                                    <td colSpan={4} className="px-3 py-4 text-center text-gray-500 dark:text-gray-400">
                                        No hay quizzes completados aún
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>


        </section>
    )

}