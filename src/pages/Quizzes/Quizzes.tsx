import { AsideMenu } from "../../components/asideMenu"

export const Quizzes = () => {
  return (
    <div className="bg-gray-100 dark:bg-gray-700 min-h-screen">
      <AsideMenu />
      <main className="ease-soft-in-out lg:ml-68.5 relative min-h-screen rounded-xl transition-all duration-200 pt-8">
        <div className="w-full px-6 mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 bg-white/80 dark:bg-gray-800/80 rounded-xl shadow p-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Mis Quizzes</h2>
              <p className="text-sm text-gray-600 dark:text-gray-300">Gestiona tus quizzes y revisa tu progreso</p>
            </div>
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold shadow transition-colors">
              Crear Nuevo Quiz
            </button>
          </div>

          {/* Estadísticas */}
          <div className="grid md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded shadow p-4 text-center">
              <div className="text-3xl font-bold text-blue-600">12</div>
              <div className="text-sm text-gray-500">Quizzes Completados</div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded shadow p-4 text-center">
              <div className="text-3xl font-bold text-green-600">8.5</div>
              <div className="text-sm text-gray-500">Promedio General</div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded shadow p-4 text-center">
              <div className="text-3xl font-bold text-yellow-600">3</div>
              <div className="text-sm text-gray-500">Quizzes Pendientes</div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded shadow p-4 text-center">
              <div className="text-3xl font-bold text-purple-600">5</div>
              <div className="text-sm text-gray-500">Grupos Activos</div>
            </div>
          </div>

          {/* Quizzes Recientes */}
          <div className="mb-8">
            <h3 className="font-bold text-lg mb-4">Quizzes Recientes</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-white dark:bg-gray-800 rounded shadow p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold">Introducción a React</h4>
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Completado</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">Conceptos básicos de React y componentes</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Puntuación: 9/10</span>
                  <button className="text-blue-600 text-sm hover:underline">Revisar</button>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded shadow p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold">JavaScript Avanzado</h4>
                  <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">Pendiente</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">Closures, promesas y async/await</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">15 preguntas</span>
                  <button className="text-blue-600 text-sm hover:underline">Iniciar</button>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded shadow p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold">CSS Grid y Flexbox</h4>
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Completado</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">Layout moderno con CSS</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Puntuación: 7/10</span>
                  <button className="text-blue-600 text-sm hover:underline">Revisar</button>
                </div>
              </div>
            </div>
          </div>

          {/* Historial Completo */}
          <div>
            <h3 className="font-bold text-lg mb-4">Historial Completo</h3>
            <div className="bg-white dark:bg-gray-800 rounded shadow overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="text-left p-4">Quiz</th>
                    <th className="text-left p-4">Grupo</th>
                    <th className="text-left p-4">Fecha</th>
                    <th className="text-left p-4">Puntuación</th>
                    <th className="text-left p-4">Estado</th>
                    <th className="text-left p-4">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100 dark:border-gray-700">
                    <td className="p-4">Introducción a React</td>
                    <td className="p-4">Grupo Frontend</td>
                    <td className="p-4">15/05/2024</td>
                    <td className="p-4">9/10</td>
                    <td className="p-4"><span className="text-green-600">✓ Completado</span></td>
                    <td className="p-4">
                      <button className="text-blue-600 hover:underline text-sm">Revisar</button>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-gray-700">
                    <td className="p-4">CSS Grid y Flexbox</td>
                    <td className="p-4">Grupo Frontend</td>
                    <td className="p-4">12/05/2024</td>
                    <td className="p-4">7/10</td>
                    <td className="p-4"><span className="text-green-600">✓ Completado</span></td>
                    <td className="p-4">
                      <button className="text-blue-600 hover:underline text-sm">Revisar</button>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-gray-700">
                    <td className="p-4">JavaScript Avanzado</td>
                    <td className="p-4">Grupo JavaScript</td>
                    <td className="p-4">-</td>
                    <td className="p-4">-</td>
                    <td className="p-4"><span className="text-yellow-600">⏳ Pendiente</span></td>
                    <td className="p-4">
                      <button className="text-blue-600 hover:underline text-sm">Iniciar</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
} 