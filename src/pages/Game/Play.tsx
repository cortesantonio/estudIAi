import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AsideMenu } from "../../components/asideMenu";
import { getQuizById, getSessionAnswered, saveResult } from "../../services/quizzesService";
import type { Question, SessionAnswered } from "../../interfaces/Quizzes";

export const Play = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [quiz, setQuiz] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [status, setStatus] = useState<"loading" | "error" | "playing" | "finished">("loading");
  const [error, setError] = useState<string>("");
  const [isConfirmed, setIsConfirmed] = useState<boolean>(false);
  const [previousResult, setPreviousResult] = useState<SessionAnswered | null>(null);
  const [isAlreadyAnswered, setIsAlreadyAnswered] = useState<boolean>(false);
  const totalQuestions = quiz.length;
  const currentQuestion = quiz[currentIndex];
  const hasSelection = selected !== null;
  const initialTime = totalQuestions * 30;


  // Cargar quiz
  useEffect(() => {
    const loadQuizAndCheckStatus = async () => {
      if (!id) return setError("ID no encontrado"), setStatus("error");

      try {
        // Primero obtener las preguntas para saber el total
        const quizData = await getQuizById(Number(id));
        if (quizData)
          setQuiz(quizData);
        setTimeLeft(quizData.length * 30);
        // Luego verificar si ya fue respondido
        try {
          const result = await getSessionAnswered(Number(id), Number(user.id));
          console.log(result)
          if (result) {
            setPreviousResult(result);
            setIsAlreadyAnswered(true);
            setStatus("finished");
            return;
          }
        } catch {
          setError("No hay resultado previo");
          setStatus("error");
          console.log("No hay resultado previo");
        }

        // Si no fue respondido, iniciar el juego
        setStatus("playing");
      } catch (e: unknown) {
        const errorMessage = e instanceof Error ? e.message : "Error al cargar el quiz";
        setError(errorMessage);
        setStatus("error");
      }
    };

    loadQuizAndCheckStatus();
  }, [id]);

  // Timer
  useEffect(() => {
    if (status !== "playing") return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setStatus("finished");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [status]);

  const formatTime = (sec: number) =>
    `${Math.floor(sec / 60)}:${(sec % 60).toString().padStart(2, "0")}`;

  const handleConfirm = () => {
    if (selected === null || !currentQuestion) return;
    if (selected === currentQuestion.correctOptionIndex) setScore(s => s + 1);
    setIsConfirmed(true);
  };

  const handleNext = () => {
    if (currentIndex + 1 < totalQuestions) {
      setCurrentIndex(i => i + 1);
      setSelected(null);
      setIsConfirmed(false);
    } else {
      setStatus("finished");
    }
  };
  // Componentes auxiliares
  const Loader = () => (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
    </div>
  );

  const ErrorScreen = () => (
    <div className="text-center p-8">
      <h2 className="text-3xl font-bold mb-4">Error al cargar</h2>
      <p className="mb-6">{error}</p>
      <button onClick={() => navigate("/quizzes")} className="btn-primary">Volver</button>
    </div>
  );

  const FinishedScreen = () => {
    const currentScore = previousResult ? previousResult.score : score;
    const percent = Math.round((currentScore / Math.max(totalQuestions, 1)) * 100);
    const errors = Math.max(totalQuestions - currentScore, 0);
    const timeUsed = isAlreadyAnswered ? 0 : Math.max(initialTime - timeLeft, 0);
    const ringBgLight = `conic-gradient(rgb(37,99,235) ${percent}%, rgb(229,231,235) 0)`; // blue-600, gray-200
    const ringBgDark = `conic-gradient(rgb(147,197,253) ${percent}%, rgb(75,85,99) 0)`; // blue-300, gray-600

    // guardar resultado en la base de datos solo si no fue respondido antes y se ha jugado
    useEffect(() => {
      if (!isAlreadyAnswered && score > 0) {
        const persistResult = async () => {
          const resultToSave: SessionAnswered = {
            sessionId: Number(id),
            userId: Number(user.id),
            answeredAt: new Date(),
            score: score
          };
          await saveResult(resultToSave);
        };
        persistResult();
      }
    }, [score, errors, timeUsed, isAlreadyAnswered]);

    return (
      <div className="min-h-[60vh] flex items-center justify-center p-6">
        <div className="w-full max-w-3xl bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 md:p-10 text-center">
          <div className="mb-6">
            <span className="inline-block px-4 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-200">Completado</span>
            <h2 className="text-3xl md:text-4xl font-extrabold mt-3 text-gray-900 dark:text-white">¡Excelente trabajo! 🎉</h2>
            <p className="text-gray-600 dark:text-gray-300 mt-2">Has finalizado el quiz. Aquí tienes tu resultado:</p>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-14 mb-8">
            <div className="relative w-40 h-40 md:w-48 md:h-48">
              <div
                className="absolute inset-0 rounded-full"
                style={{ background: ringBgLight }}
              />
              <div
                className="absolute inset-0 rounded-full hidden dark:block"
                style={{ background: ringBgDark }}
              />
              <div className="absolute inset-2 md:inset-3 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center shadow-inner">
                <div>
                  <div className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">{percent}%</div>
                  <div className="text-xs md:text-sm text-gray-500 dark:text-gray-300">Puntaje</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 md:gap-4 w-full md:w-auto">
              <div className="rounded-2xl p-4 bg-blue-50 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200">
                <div className="text-sm">Aciertos</div>
                <div className="text-2xl font-bold">{currentScore}</div>
              </div>
              <div className="rounded-2xl p-4 bg-red-50 dark:bg-red-900/30 text-red-800 dark:text-red-200">
                <div className="text-sm">Errores</div>
                <div className="text-2xl font-bold">{errors}</div>
              </div>
              <div className="rounded-2xl p-4 bg-amber-50 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200">
                <div className="text-sm">Tiempo</div>
                <div className="text-2xl font-bold">{formatTime(timeUsed)}</div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
            {!isAlreadyAnswered && (
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 rounded-xl font-semibold bg-blue-600 text-white shadow hover:bg-blue-700 active:scale-[0.99] transition"
              >
                Volver a intentar
              </button>
            )}
            <button
              onClick={() => navigate("/quizzes")}
              className="px-6 py-3 rounded-xl font-semibold bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-100 shadow hover:bg-gray-300 dark:hover:bg-gray-600 active:scale-[0.99] transition"
            >
              Volver al listado
            </button>
          </div>
        </div>
      </div>
    );
  };
  const QuestionScreen = () => (
    <div className="max-w-3xl mx-auto">
      <header className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <div className="text-sm text-gray-600 dark:text-gray-300">Pregunta {currentIndex + 1} / {totalQuestions}</div>
          <div className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-100 text-sm font-medium">
            ⏱ {formatTime(timeLeft)}
          </div>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2 overflow-hidden">
          <div
            className="bg-blue-600 h-2 transition-all duration-500"
            style={{ width: `${Math.min(((currentIndex) / Math.max(totalQuestions, 1)) * 100, 100)}%` }}
          />
        </div>
      </header>

      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6">
        <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-gray-100">{currentQuestion.questionText}</h3>

        <div className="space-y-3 mb-6">
          {(currentQuestion.answerOptions && currentQuestion.answerOptions.length > 0
            ? currentQuestion.answerOptions
            : ["Verdadero", "Falso"]).map((opt, i) => {
            const isCorrectOption = i === currentQuestion.correctOptionIndex;
            const isSelectedOption = i === selected;
            const showCorrect = isConfirmed && isCorrectOption;
            const showIncorrect = isConfirmed && isSelectedOption && !isCorrectOption;

            const baseClasses = "w-full text-left p-4 border rounded-xl transition select-none disabled:opacity-70 disabled:cursor-not-allowed";
            const stateClasses = isConfirmed
              ? showCorrect
                ? " border-green-500 bg-green-50 text-green-800"
                : showIncorrect
                  ? " border-red-500 bg-red-50 text-red-800"
                  : " border-gray-300 bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
              : isSelectedOption
                ? " border-blue-500 bg-blue-50 text-blue-800"
                : " border-gray-300 hover:border-gray-400 dark:border-gray-600 dark:hover:border-gray-500 text-gray-800 dark:text-gray-100";

            return (
              <button
                key={i}
                onClick={() => !isConfirmed && setSelected(i)}
                disabled={isConfirmed}
                className={baseClasses + stateClasses}
              >
                <div className="flex items-center gap-3">
                  <span className="flex-1">{opt}</span>
                  {isConfirmed && (
                    <span className={`text-sm font-medium ${showCorrect ? "text-green-700" : showIncorrect ? "text-red-700" : "text-gray-500"}`}>
                      {showCorrect ? "Correcta" : showIncorrect ? "Tu elección" : ""}
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {!isConfirmed ? (
          <div className="flex justify-end">
            <button
              onClick={handleConfirm}
              disabled={!hasSelection}
              className={`px-6 py-3 rounded-xl font-medium shadow ${hasSelection ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-gray-300 text-gray-600 cursor-not-allowed"}`}
            >
              Confirmar
            </button>
          </div>
        ) : (
          <div className="mt-2 flex items-center justify-between">
            <div>
              {selected === currentQuestion.correctOptionIndex ? (
                <span className="text-green-700 font-medium">¡Correcto! 🎉</span>
              ) : (
                <span className="text-red-700 font-medium">
                  Incorrecto. Respuesta correcta: {(currentQuestion.answerOptions && currentQuestion.answerOptions.length > 0
                    ? currentQuestion.answerOptions
                    : ["Verdadero", "Falso"]) [currentQuestion.correctOptionIndex]}
                </span>
              )}
            </div>
            <button onClick={handleNext} className="px-6 py-3 rounded-xl font-medium shadow bg-indigo-600 text-white hover:bg-indigo-700">
              {currentIndex + 1 === totalQuestions ? "Finalizar" : "Siguiente"}
            </button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="bg-gray-100 dark:bg-gray-700 min-h-screen">
      <AsideMenu />
      <main className="p-6 lg:ml-68.5">
        {status === "loading" && <Loader />}
        {status === "error" && <ErrorScreen />}
        {status === "finished" && <FinishedScreen />}
        {status === "playing" && currentQuestion && <QuestionScreen />}
      </main>
    </div>
  );
};
