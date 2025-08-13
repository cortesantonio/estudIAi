import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AsideMenu } from "../../components/asideMenu";
import { getQuizById } from "../../services/quizzesService";
import type { Question } from "../../interfaces/Quizzes";

export const Play = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [status, setStatus] = useState<"loading" | "error" | "playing" | "finished">("loading");
  const [error, setError] = useState<string>("");

  const totalQuestions = quiz.length;
  const currentQuestion = quiz[currentIndex];
  const isAnswered = selected !== null;

  // Cargar quiz
  useEffect(() => {
    if (!id) return setError("ID no encontrado"), setStatus("error");
    getQuizById(Number(id))
      .then(data => {
        setQuiz(data);
        setTimeLeft(data.length * 60);
        setStatus("playing");
      })
      .catch(e => {
        setError(e.message || "Error al cargar el quiz");
        setStatus("error");
      });
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
    console.log(selected, currentQuestion.correctOptionIndex)
    if (selected === null) return;
    if (selected === currentQuestion.correctOptionIndex) setScore(s => s + 1);
  };

  const handleNext = () => {
    if (currentIndex + 1 < totalQuestions) {
      setCurrentIndex(i => i + 1);
      setSelected(null);
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

  const FinishedScreen = () => (
    <div className="text-center p-8">
      <h2 className="text-3xl font-bold mb-4">¡Quiz Completado!</h2>
      <p className="mb-6">{score}/{totalQuestions} ({Math.round((score / totalQuestions) * 100)}%)</p>
      <button onClick={() => window.location.reload()} className="btn-primary">Reintentar</button>
      <button onClick={() => navigate("/quizzes")} className="btn-secondary">Volver</button>
    </div>
  );
  const QuestionScreen = () => (
    <div>
      <header className="flex justify-between items-center mb-4">
        <div>Pregunta {currentIndex + 1} / {totalQuestions}</div>
        <div>{formatTime(timeLeft)}</div>
      </header>

      <h3 className="text-lg font-semibold mb-4">{currentQuestion.questionText}</h3>
      <div className="space-y-2 mb-6">
        {currentQuestion.answerOptions.map((opt, i) => (
          <button
            key={i}
            onClick={() => setSelected(i)}
            className={`w-full p-3 border rounded ${selected === i ? "border-blue-500" : "border-gray-300"}`}
          >
            {opt}
          </button>
        ))}
      </div>

      <div className="flex justify-end gap-2">
        {isAnswered ? (
          <button onClick={handleNext} className="btn-primary">
            {currentIndex + 1 === totalQuestions ? "Finalizar" : "Siguiente"}
          </button>
        ) : (
          <button onClick={handleConfirm}  className=" bg-yellow-200">
            Confirmar
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="bg-gray-100 dark:bg-gray-700 min-h-screen">
      <AsideMenu />
      <main className="p-6">
        {status === "loading" && <Loader />}
        {status === "error" && <ErrorScreen />}
        {status === "finished" && <FinishedScreen />}
        {status === "playing" && currentQuestion && <QuestionScreen />}
      </main>
    </div>
  );
};
