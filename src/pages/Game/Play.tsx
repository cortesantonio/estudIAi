import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { AsideMenu } from "../../components/asideMenu"
/* import { getQuizById } from "../../services/quizzesService"
 */import type {  Quiz } from "../../interfaces/Quizzes"
interface PlayProps {
  quizId?: number
  quizData?: Quiz
}

export const Play = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [isAnswered, setIsAnswered] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [score, setScore] = useState(0)
  const [totalQuestions, setTotalQuestions] = useState(0)
  const [quiz, setQuiz] = useState<Quiz | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [gameFinished, setGameFinished] = useState(false)
  const [timeLeft, setTimeLeft] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Obtener datos del quiz desde la API
  useEffect(() => {
    const fetchQuiz = async () => {
      if (!id) {
        setError("ID del quiz no encontrado")
        setIsLoading(false)
        return
      }

     /*  try {
        const quizData = await getQuizById(parseInt(id))
        setQuiz(quizData)
        setTotalQuestions(quizData.questions?.length || 0)
        setIsLoading(false)
      } catch (error: any) {
        setError(error.message || "Error al cargar el quiz")
        setIsLoading(false)
      } */
    }

    fetchQuiz()
  }, [id])

  // Timer para el quiz
  useEffect(() => {
    if (quiz?.duration && !gameFinished) {
      setTimeLeft(quiz.duration * 60) // Convertir minutos a segundos

      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev && prev <= 1) {
            clearInterval(timer)
            finishGame()
            return 0
          }
          return prev ? prev - 1 : null
        })
      }, 1000)

      return () => clearInterval(timer)
    }
  }, [quiz, gameFinished])

  const handleAnswerSelect = (optionIndex: number) => {
    if (isAnswered) return
    setSelectedAnswer(optionIndex)
  }

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null || isAnswered) return

    const currentQuestion = quiz?.questions?.[currentQuestionIndex]
    if (!currentQuestion) return

    const correct = selectedAnswer === currentQuestion.correctOption
    setIsCorrect(correct)
    setIsAnswered(true)

    if (correct) {
      setScore(score + 1)
    }
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < (quiz?.questions?.length || 0) - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setSelectedAnswer(null)
      setIsAnswered(false)
      setIsCorrect(false)
    } else {
      finishGame()
    }
  }

  const finishGame = () => {
    setGameFinished(true)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const getCurrentQuestion = () => {
    return quiz?.questions?.[currentQuestionIndex]
  }

  if (isLoading) {
    return (
      <div className="bg-gray-100 dark:bg-gray-700 min-h-screen">
        <AsideMenu />
        <main className="ease-soft-in-out lg:ml-68.5 relative min-h-screen rounded-xl transition-all duration-200 pt-8">
          <div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
          </div>
        </main>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-gray-100 dark:bg-gray-700 min-h-screen">
        <AsideMenu />
        <main className="ease-soft-in-out lg:ml-68.5 relative min-h-screen rounded-xl transition-all duration-200 pt-8">
          <div className="w-full px-6 mx-auto">
            <div className="max-w-2xl mx-auto">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center">
                <div className="w-24 h-24 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                
                <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
                  Error al Cargar el Quiz
                </h2>
                
                <p className="text-gray-600 dark:text-gray-400 mb-8">
                  {error}
                </p>

                <div className="space-y-4">
                  <button
                    onClick={() => navigate('/quizzes')}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                  >
                    Volver a Quizzes
                  </button>
                  
                  <button
                    onClick={() => window.location.reload()}
                    className="w-full bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                  >
                    Intentar de Nuevo
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  }

  if (gameFinished) {
    return (
      <div className="bg-gray-100 dark:bg-gray-700 min-h-screen">
        <AsideMenu />
        <main className="ease-soft-in-out lg:ml-68.5 relative min-h-screen rounded-xl transition-all duration-200 pt-8">
          <div className="w-full px-6 mx-auto">
            <div className="max-w-2xl mx-auto">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center">
                <div className="w-24 h-24 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>

                <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
                  ¡Quiz Completado!
                </h2>

                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {quiz?.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {quiz?.description}
                  </p>
                </div>

                <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-6 mb-8">
                  <div className="text-white">
                    <div className="text-4xl font-bold mb-2">
                      {score}/{totalQuestions}
                    </div>
                    <div className="text-lg">
                      Preguntas correctas
                    </div>
                    <div className="text-2xl font-semibold mt-2">
                      {Math.round((score / totalQuestions) * 100)}%
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <button
                    onClick={() => window.location.reload()}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                  >
                    Jugar de Nuevo
                  </button>

                  <button
                    onClick={() => navigate('/quizzes')}
                    className="w-full bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                  >
                    Volver a Quizzes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  }

  const currentQuestion = getCurrentQuestion()

  return (
    <div className="bg-gray-100 dark:bg-gray-700 min-h-screen">
      <AsideMenu />
      <main className="ease-soft-in-out lg:ml-68.5 relative min-h-screen rounded-xl transition-all duration-200 pt-8">
        <div className="w-full px-6 mx-auto">
          {/* Header con progreso y timer */}
          <div className="mb-6 bg-white/80 dark:bg-gray-800/80 rounded-xl shadow p-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                  {quiz?.title}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Pregunta {currentQuestionIndex + 1} de {totalQuestions}
                </p>
              </div>

              <div className="flex items-center gap-4">
                {timeLeft !== null && (
                  <div className="flex items-center gap-2 bg-red-100 dark:bg-red-900 px-3 py-2 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="font-mono font-bold text-red-600 dark:text-red-400">
                      {formatTime(timeLeft)}
                    </span>
                  </div>
                )}

                <div className="bg-blue-100 dark:bg-blue-900 px-3 py-2 rounded-lg">
                  <span className="font-semibold text-blue-600 dark:text-blue-400">
                    {score}/{totalQuestions}
                  </span>
                </div>
              </div>
            </div>

            {/* Barra de progreso */}
            <div className="mt-4">
              <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Contenido principal */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
              {currentQuestion && (
                <>
                  {/* Pregunta */}
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                      {currentQuestion.text}
                    </h3>
                  </div>

                  {/* Opciones */}
                  <div className="space-y-3 mb-8">
                    {currentQuestion.options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleAnswerSelect(index)}
                        disabled={isAnswered}
                        className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${selectedAnswer === index
                            ? isAnswered
                              ? index === currentQuestion.correctOption
                                ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                                : 'border-red-500 bg-red-50 dark:bg-red-900/20'
                              : 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                            : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                          } ${isAnswered && index === currentQuestion.correctOption
                            ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                            : ''
                          }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedAnswer === index
                              ? isAnswered
                                ? index === currentQuestion.correctOption
                                  ? 'border-green-500 bg-green-500'
                                  : 'border-red-500 bg-red-500'
                                : 'border-blue-500 bg-blue-500'
                              : 'border-gray-300 dark:border-gray-500'
                            }`}>
                            {selectedAnswer === index && (
                              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            )}
                          </div>
                          <span className={`font-medium ${selectedAnswer === index
                              ? isAnswered
                                ? index === currentQuestion.correctOption
                                  ? 'text-green-700 dark:text-green-300'
                                  : 'text-red-700 dark:text-red-300'
                                : 'text-blue-700 dark:text-blue-300'
                              : 'text-gray-700 dark:text-gray-300'
                            }`}>
                            {option}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Feedback de respuesta */}
                  {isAnswered && (
                    <div className={`mb-6 p-4 rounded-lg ${isCorrect
                        ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'
                        : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
                      }`}>
                      <div className="flex items-center gap-3">
                        {isCorrect ? (
                          <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        ) : (
                          <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        )}
                        <span className={`font-semibold ${isCorrect
                            ? 'text-green-700 dark:text-green-300'
                            : 'text-red-700 dark:text-red-300'
                          }`}>
                          {isCorrect ? '¡Correcto!' : 'Incorrecto'}
                        </span>
                      </div>
                      {!isCorrect && (
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                          La respuesta correcta era: <span className="font-semibold">{currentQuestion.options[currentQuestion.correctOption]}</span>
                        </p>
                      )}
                    </div>
                  )}

                  {/* Botones de acción */}
                  <div className="flex justify-between">
                    <button
                      onClick={() => navigate('/quizzes')}
                      className="px-6 py-3 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white font-medium transition-colors"
                    >
                      Salir del Quiz
                    </button>

                    <div className="flex gap-3">
                      {!isAnswered ? (
                        <button
                          onClick={handleSubmitAnswer}
                          disabled={selectedAnswer === null}
                          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold rounded-lg transition-colors"
                        >
                          Confirmar Respuesta
                        </button>
                      ) : (
                        <button
                          onClick={handleNextQuestion}
                          className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors"
                        >
                          {currentQuestionIndex < totalQuestions - 1 ? 'Siguiente Pregunta' : 'Finalizar Quiz'}
                        </button>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
} 