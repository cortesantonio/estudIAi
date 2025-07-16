import { AsideMenu } from "../../components/asideMenu"

export const Results = () => {
  return (
    <div className="bg-gray-100 dark:bg-gray-700 min-h-screen">
      <AsideMenu />
      <main className="ease-soft-in-out lg:ml-68.5 relative min-h-screen rounded-xl transition-all duration-200 pt-8">
        <div className="w-full px-6 mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 bg-white/80 dark:bg-gray-800/80 rounded-xl shadow p-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Resultados Globales</h2>
              <p className="text-sm text-gray-600 dark:text-gray-300">Revisa tu rendimiento general en todos los quizzes</p>
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold shadow transition-colors">
                Exportar Reporte
              </button>
              <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold shadow transition-colors">
                Compartir
              </button>
            </div>
          </div>

          {/* Estadísticas principales */}
          <div className="grid md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded shadow p-4 text-center">
              <div className="text-3xl font-bold text-blue-600">85%</div>
              <div className="text-sm text-gray-500">Promedio General</div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded shadow p-4 text-center">
              <div className="text-3xl font-bold text-green-600">24</div>
              <div className="text-sm text-gray-500">Quizzes Completados</div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded shadow p-4 text-center">
              <div className="text-3xl font-bold text-yellow-600">#3</div>
              <div className="text-sm text-gray-500">Posición Global</div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded shadow p-4 text-center">
              <div className="text-3xl font-bold text-purple-600">12h</div>
              <div className="text-sm text-gray-500">Tiempo Total</div>
            </div>
          </div>

          {/* Gráficos y análisis */}
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* Progreso por categoría */}
            <div className="bg-white dark:bg-gray-800 rounded shadow p-6">
              <h3 className="font-bold text-lg mb-4">Progreso por Categoría</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Frontend</span>
                    <span className="text-sm text-gray-500">92%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '92%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Backend</span>
                    <span className="text-sm text-gray-500">78%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '78%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Base de Datos</span>
                    <span className="text-sm text-gray-500">85%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">DevOps</span>
                    <span className="text-sm text-gray-500">65%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-purple-600 h-2 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Gráfico de rendimiento */}
            <div className="bg-white dark:bg-gray-800 rounded shadow p-6">
              <h3 className="font-bold text-lg mb-4">Rendimiento Mensual</h3>
              <div className="h-64 flex items-end justify-between gap-2">
                <div className="flex flex-col items-center">
                  <div className="w-8 bg-blue-600 rounded-t" style={{ height: '60%' }}></div>
                  <span className="text-xs text-gray-500 mt-2">Ene</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-8 bg-blue-600 rounded-t" style={{ height: '75%' }}></div>
                  <span className="text-xs text-gray-500 mt-2">Feb</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-8 bg-blue-600 rounded-t" style={{ height: '85%' }}></div>
                  <span className="text-xs text-gray-500 mt-2">Mar</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-8 bg-blue-600 rounded-t" style={{ height: '70%' }}></div>
                  <span className="text-xs text-gray-500 mt-2">Abr</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-8 bg-blue-600 rounded-t" style={{ height: '90%' }}></div>
                  <span className="text-xs text-gray-500 mt-2">May</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-8 bg-blue-600 rounded-t" style={{ height: '95%' }}></div>
                  <span className="text-xs text-gray-500 mt-2">Jun</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tabla de clasificación global */}
          <div className="bg-white dark:bg-gray-800 rounded shadow overflow-hidden">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="font-bold text-lg">Clasificación Global</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Top 10 estudiantes</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="text-left p-4">Posición</th>
                    <th className="text-left p-4">Usuario</th>
                    <th className="text-left p-4">Promedio</th>
                    <th className="text-left p-4">Quizzes</th>
                    <th className="text-left p-4">Tiempo</th>
                    <th className="text-left p-4">Última Actividad</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100 dark:border-gray-700">
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 bg-yellow-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
                        <span className="text-gray-500">#1</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img src="/marie.jpg" className="w-8 h-8 rounded-full" alt="Avatar" />
                        <span className="font-medium">María García</span>
                      </div>
                    </td>
                    <td className="p-4 text-green-600 font-semibold">95%</td>
                    <td className="p-4">32</td>
                    <td className="p-4">18h</td>
                    <td className="p-4 text-gray-500">Hace 2h</td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-gray-700">
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 bg-gray-400 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
                        <span className="text-gray-500">#2</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img src="/ivana-square.jpg" className="w-8 h-8 rounded-full" alt="Avatar" />
                        <span className="font-medium">Carlos López</span>
                      </div>
                    </td>
                    <td className="p-4 text-green-600 font-semibold">92%</td>
                    <td className="p-4">28</td>
                    <td className="p-4">15h</td>
                    <td className="p-4 text-gray-500">Hace 5h</td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-gray-700">
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
                        <span className="text-gray-500">#3</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img src="/team-1.jpg" className="w-8 h-8 rounded-full" alt="Avatar" />
                        <span className="font-medium">Ana Martínez</span>
                      </div>
                    </td>
                    <td className="p-4 text-green-600 font-semibold">88%</td>
                    <td className="p-4">25</td>
                    <td className="p-4">12h</td>
                    <td className="p-4 text-gray-500">Hace 1d</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Logros y badges */}
          <div className="mt-8">
            <h3 className="font-bold text-lg mb-4">Logros Desbloqueados</h3>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="bg-white dark:bg-gray-800 rounded shadow p-4 text-center">
                <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">🏆</span>
                </div>
                <h4 className="font-semibold text-gray-800 dark:text-white">Campeón</h4>
                <p className="text-xs text-gray-600 dark:text-gray-300">Top 1 en clasificación</p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded shadow p-4 text-center">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">⚡</span>
                </div>
                <h4 className="font-semibold text-gray-800 dark:text-white">Velocista</h4>
                <p className="text-xs text-gray-600 dark:text-gray-300">10 quizzes en 1 día</p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded shadow p-4 text-center">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">🎯</span>
                </div>
                <h4 className="font-semibold text-gray-800 dark:text-white">Preciso</h4>
                <p className="text-xs text-gray-600 dark:text-gray-300">100% en 5 quizzes</p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded shadow p-4 text-center">
                <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">📚</span>
                </div>
                <h4 className="font-semibold text-gray-800 dark:text-white">Estudiante</h4>
                <p className="text-xs text-gray-600 dark:text-gray-300">25 quizzes completados</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
} 