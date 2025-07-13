import { useState } from "react"
import { AsideMenu } from "../../components/asideMenu"

export const JoinGame = () => {
  const [gameCode, setGameCode] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleJoinGame = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simular carga
    setTimeout(() => {
      setIsLoading(false)
      // Aquí iría la lógica real para unirse al juego
    }, 2000)
  }

  return (
    <div className="bg-gray-100 dark:bg-gray-700 min-h-screen">
      <AsideMenu />
      <main className="ease-soft-in-out lg:ml-68.5 relative min-h-screen rounded-xl transition-all duration-200 pt-8">
        <div className="w-full px-6 mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 bg-white/80 dark:bg-gray-800/80 rounded-xl shadow p-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Unirse a Juego</h2>
              <p className="text-sm text-gray-600 dark:text-gray-300">Ingresa el código del juego para participar</p>
            </div>
          </div>

          {/* Formulario principal */}
          <div className="max-w-md mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">¡Únete al Juego!</h3>
                <p className="text-gray-600 dark:text-gray-300">Ingresa el código que te proporcionó el administrador</p>
              </div>

              <form onSubmit={handleJoinGame} className="space-y-6">
                <div>
                  <label htmlFor="gameCode" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Código del Juego
                  </label>
                  <input
                    type="text"
                    id="gameCode"
                    value={gameCode}
                    onChange={(e) => setGameCode(e.target.value)}
                    placeholder="Ej: ABC123"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading || !gameCode.trim()}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Uniéndose...
                    </>
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      Unirse al Juego
                    </>
                  )}
                </button>
              </form>

              {/* Información adicional */}
              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-600">
                <h4 className="font-semibold text-gray-800 dark:text-white mb-3">¿Cómo funciona?</h4>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>El administrador te proporcionará un código único</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Ingresa el código en el campo de arriba</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Serás redirigido al juego automáticamente</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Juegos recientes */}
            <div className="mt-8">
              <h3 className="font-bold text-lg mb-4 text-gray-800 dark:text-white">Juegos Recientes</h3>
              <div className="space-y-3">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-gray-800 dark:text-white">Quiz de React</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Código: REACT2024</p>
                  </div>
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    Reunirse
                  </button>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-gray-800 dark:text-white">JavaScript Básico</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Código: JS101</p>
                  </div>
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    Reunirse
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
} 