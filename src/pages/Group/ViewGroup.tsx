import { useEffect, useState } from "react"
import { AsideMenu } from "../../components/asideMenu"
import { useParams } from "react-router-dom"
import { GetGroup } from "../../services/groupService"
import type { Group } from "../../interfaces/Group"
import type { Quiz } from "../../interfaces/Quizzes"
import { Chat } from "./tabsViewGroup/tabChat"
import { GenerateQuizModal } from "./GenerateQuizModal"
import { getSessions } from "../../services/sessionService"

const TABS = [
  { key: "chat", label: "Chat grupal" },
  { key: "quizzes", label: "Quizzes" },
  { key: "integrantes", label: "Integrantes" },
  { key: "resultados", label: "Resultados" },
  { key: "progreso", label: "Progreso Individual" },
]
export const ViewGroup = () => {
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState("quizzes")
  const { id } = useParams();
  const [group, setGroup] = useState<Partial<Group>>();
  const [quizzes, setQuizzes] = useState<Partial<Quiz[]>>([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    async function fetSessions(id: any) {
      try {
        const response = await getSessions(id)
        setQuizzes(response)
      } catch (error) {
        console.error(error)
      }
    }
    fetSessions(id)



  }, [id])


  useEffect(() => {
    async function fetchGroup(id: string) {
      try {
        const responseGroup = await GetGroup(id);
        setGroup(responseGroup)
      } catch (error) {
        console.error(error)
      }

    }
    fetchGroup(id || "")
  }, [id])

  setTimeout(() => {
    setLoading(false)
  }, 2000);

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

  return (
    <div className="bg-gray-100 dark:bg-gray-700 min-h-screen">
      <AsideMenu />
      <GenerateQuizModal isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)} onSuccess={() => { }} group={group as Group} />


      <main className="ease-soft-in-out lg:ml-68.5 relative min-h-screen rounded-xl transition-all duration-200 pt-8">
        {/* Header mejorado con botón de material */}
        <div className="w-full px-6 mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 bg-white/80 dark:bg-gray-800/80 rounded-xl shadow p-4">
            <div className="flex flex-col gap-1 md:gap-2">
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center">{group?.name || <div className="w-50 h-8 rounded-lg bg-gray-500 animate-pulse"></div>} </h2>

              </div>
              <div className="flex flex-wrap gap-3 text-sm text-gray-600 dark:text-gray-300 items-center">
                {!group ? (
                  <>
                    <div className="w-15 h-6 rounded-lg bg-gray-500 animate-pulse"></div>
                    <div className="w-20 h-6 rounded-lg bg-gray-500 animate-pulse"></div>
                    <div className="size-6 rounded-full bg-gray-500 animate-pulse"></div>
                    <div className="w-25 h-6 rounded-lg bg-gray-500 animate-pulse"></div>


                  </>) :
                  (
                    <><span>ID #{group?.id}</span>
                      <span>Cód. Invitación: {group.inviteCode}</span>
                      <span className="flex items-center gap-1">
                        <img className="w-6 h-6 rounded-full border-2 border-white dark:border-gray-700 shadow" src="/marie.jpg" alt="Avatar del administrador" />
                        Creado por
                        <span className="capitalize">{group.admin?.name}.</span></span>

                    </>)
                }

              </div>
            </div>

            {!group ? <>
              <div className="w-full h-10 sm:w-50 rounded-lg bg-gray-500 animate-pulse"></div>
            </> :
              <>
                <button className="w-full h-10 sm:w-50 bg-blue-600 hover:bg-blue-700  text-white rounded-lg font-semibold shadow transition-colors text-sm flex justify-center items-center gap-2 cursor-pointer" title="Descargar material de estudio">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4" /></svg>
                  Descargar material
                </button></>}

          </div>
          {/* Tabs */}
          <div className="flex gap-2 border-b border-gray-300 dark:border-gray-600 mb-6 overflow-auto">
            {TABS.map(t => (
              <button
                key={t.key}
                className={`px-4 py-2 rounded-t-md font-semibold cursor-pointer transition-colors ${tab === t.key ? 'bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 border-b-2 border-blue-500' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'}`}
                onClick={() => setTab(t.key)}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
        {/* Contenido de cada tab */}
        <div className="w-full px-6 mx-auto pb-12">

          <Chat isOpen={tab === "chat"} group={group as Group} />

          {tab === "quizzes" && (
            <section className="flex flex-col gap-8">
              {/* Quizzes Disponibles */}
              <div>
                <div className="mb-4 flex gap-4 items-center justify-between lg:justify-start ">
                  <h3 className="font-bold text-xl dark:text-white">Quizzes Disponibles</h3>
                  <button className="px-3 py-2 sm:w-50 bg-blue-600 hover:bg-blue-700  text-white rounded-lg font-semibold shadow transition-colors text-sm flex justify-center items-center gap-2 cursor-pointer"
                    title="Generar quizzes con ia" onClick={() => setModalIsOpen(!modalIsOpen)}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="#fff"><path d="M331-651 211-771l57-57 120 120-57 57Zm149-95v-170h80v170h-80Zm291 535L651-331l57-57 120 120-57 57Zm-63-440-57-57 120-120 57 57-120 120Zm38 171v-80h170v80H746ZM205-92 92-205q-12-12-12-28t12-28l363-364q35-35 85-35t85 35q35 35 35 85t-35 85L261-92q-12 12-28 12t-28-12Zm279-335-14.5-14-14.5-14-14-14-14-14 28 28 29 28ZM233-176l251-251-57-56-250 250 56 57Z" /></svg>
                    Generar con IA
                  </button>
                </div>

                <div className="flex gap-4 overflow-auto pb-2
                [&::-webkit-scrollbar]:w-2
                [&::-webkit-scrollbar-track]:rounded-lg
              [&::-webkit-scrollbar-track]:bg-gray-100
                [&::-webkit-scrollbar-thumb]:rounded-lg
              [&::-webkit-scrollbar-thumb]:bg-gray-300
              dark:[&::-webkit-scrollbar-track]:bg-gray-600
                dark:[&::-webkit-scrollbar-thumb]:bg-gray-800 
                
                ">
                  {loading && Array.from({ length: 3 }).map((_, id) => <SkeletonCard key={id} />)}
                  {quizzes && quizzes.map((quiz) => (
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex flex-col gap-2 min-w-[250px] sm:min-w-[350px]">
                      <h4 className="font-semibold dark:text-white ">{quiz?.title}</h4>
                      <p className="text-sm text-gray-600 dark:text-white">{quiz?.description}</p>
                      <div className="flex flex-wrap gap-2 text-xs text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">{quiz?.quatityQuestion || 0} preguntas</span>
                        <span className="font-semibold">Duración: {quiz?.duration || 0} min</span>
                      </div>
                      <button className="px-3 py-1 text-white rounded text-sm w-fit flex gap-1 items-center cursor-pointer  bg-blue-600 hover:bg-blue-700  ">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        Iniciar Quiz
                      </button>
                    </div>
                  ))}


                </div>
              </div>

              {/* Flashcards / Modo Práctica */}
              <div>
                <h3 className="font-bold mb-2 text-xl dark:text-white">Flashcards</h3>
                <div className="flex gap-4 overflow-y-auto pb-2
                [&::-webkit-scrollbar]:w-2
                [&::-webkit-scrollbar-track]:rounded-lg
              [&::-webkit-scrollbar-track]:bg-gray-100
                [&::-webkit-scrollbar-thumb]:rounded-lg
              [&::-webkit-scrollbar-thumb]:bg-gray-300
              dark:[&::-webkit-scrollbar-track]:bg-gray-600
                dark:[&::-webkit-scrollbar-thumb]:bg-gray-800 
                ">
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-2 py-6 flex flex-col justify-center items-center gap-2 min-w-[200px] sm:min-w-[300px]  max-w-sm">
                    <div className="font-semibold mb-2 dark:text-white text-wrap text-center">Lorem ipsum dolor sit amet
                      consectetur adipisicing elit. Tenetur, voluptatum.</div>
                    <button className="px-3 py-1  bg-blue-600 hover:bg-blue-700  text-white rounded text-sm cursor-pointer">Ver Respuesta</button>
                  </div>


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
                      <tr className="*:text-gray-900 *:first:font-medium dark:*:text-white">
                        <td className="px-3 py-2 whitespace-nowrap">Introducción a la tecno</td>
                        <td className="px-3 py-2 whitespace-nowrap">04/06/2025</td>
                        <td className="px-3 py-2 whitespace-nowrap">
                          <p className="flex gap-2">
                            7 de 10
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#75FB4C"><path d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" /></svg>
                          </p>
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap">
                          <button className="hover:bg-gray-300 dark:hover:bg-gray-600 p-1 rounded-full cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" className="dark:fill-white fill-black"><path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z" /></svg>
                          </button>
                        </td>
                      </tr>
                      <tr className="*:text-gray-900 *:first:font-medium dark:*:text-white">
                        <td className="px-3 py-2 whitespace-nowrap">conceptos a la tecno</td>
                        <td className="px-3 py-2 whitespace-nowrap">04/06/2025</td>
                        <td className="px-3 py-2 whitespace-nowrap">
                          <p className="flex gap-2">
                            3 de 10
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#999999"><path d="M280-440h400v-80H280v80ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" /></svg>                          </p>
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap">
                          <button className="hover:bg-gray-300 dark:hover:bg-gray-600 p-1 rounded-full cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" className="dark:fill-white fill-black"><path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z" /></svg>
                          </button>
                        </td>
                      </tr>

                    </tbody>
                  </table>
                </div>
              </div>


            </section>
          )}
          {tab === "integrantes" && (
            <section>
              <h3 className="font-bold mb-4">Integrantes del Grupo</h3>
              <ul className="grid md:grid-cols-3 gap-4">
                <li className="bg-white dark:bg-gray-800 rounded shadow p-4 flex items-center gap-3">
                  <img src="/marie.jpg" className="w-10 h-10 rounded-full" alt="Avatar" />
                  <div>
                    <div className="font-semibold">Admin Ejemplo</div>
                    <div className="text-xs text-gray-500">Administrador</div>
                  </div>
                </li>
                <li className="bg-white dark:bg-gray-800 rounded shadow p-4 flex items-center gap-3">
                  <img src="/ivana-square.jpg" className="w-10 h-10 rounded-full" alt="Avatar" />
                  <div>
                    <div className="font-semibold">Usuario1</div>
                    <div className="text-xs text-gray-500">Miembro</div>
                  </div>
                </li>
                <li className="bg-white dark:bg-gray-800 rounded shadow p-4 flex items-center gap-3">
                  <img src="/team-1.jpg" className="w-10 h-10 rounded-full" alt="Avatar" />
                  <div>
                    <div className="font-semibold">Usuario2</div>
                    <div className="text-xs text-gray-500">Miembro</div>
                  </div>
                </li>
              </ul>
            </section>
          )}
          {tab === "resultados" && (
            <section className="flex flex-col gap-8">
              <div>
                <h3 className="font-bold mb-2">Resumen del Grupo</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-white dark:bg-gray-800 rounded shadow p-4 text-center">
                    <div className="text-3xl font-bold text-blue-600">7.5</div>
                    <div className="text-sm text-gray-500">Puntuación Media</div>
                  </div>
                  <div className="bg-white dark:bg-gray-800 rounded shadow p-4 text-center">
                    <div className="text-3xl font-bold text-green-600">12</div>
                    <div className="text-sm text-gray-500">Miembros con Quizzes Completados</div>
                  </div>
                  <div className="bg-white dark:bg-gray-800 rounded shadow p-4 text-center">
                    <div className="text-3xl font-bold text-yellow-600">#1</div>
                    <div className="text-sm text-gray-500">Posición en Clasificación</div>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-bold mb-2">Tabla de Clasificación</h3>
                <table className="w-full text-sm bg-white dark:bg-gray-800 rounded shadow">
                  <thead>
                    <tr className="text-left border-b">
                      <th className="p-2">Usuario</th>
                      <th className="p-2">Puntuación</th>
                      <th className="p-2">Quizzes Completados</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-2">Admin Ejemplo</td>
                      <td className="p-2">9.0</td>
                      <td className="p-2">2</td>
                    </tr>
                    <tr>
                      <td className="p-2">Usuario1</td>
                      <td className="p-2">7.5</td>
                      <td className="p-2">2</td>
                    </tr>
                    <tr>
                      <td className="p-2">Usuario2</td>
                      <td className="p-2">6.0</td>
                      <td className="p-2">1</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
          )}
          {tab === "progreso" && (
            <section className="flex flex-col gap-8">
              <div>
                <h3 className="font-bold mb-2">Mi Progreso</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-white dark:bg-gray-800 rounded shadow p-4 text-center">
                    <div className="text-3xl font-bold text-blue-600">8/10</div>
                    <div className="text-sm text-gray-500">Mejor Puntuación</div>
                  </div>
                  <div className="bg-white dark:bg-gray-800 rounded shadow p-4 text-center">
                    <div className="text-3xl font-bold text-green-600">2</div>
                    <div className="text-sm text-gray-500">Quizzes Completados</div>
                  </div>
                  <div className="bg-white dark:bg-gray-800 rounded shadow p-4 text-center">
                    <div className="text-3xl font-bold text-yellow-600">45 min</div>
                    <div className="text-sm text-gray-500">Tiempo de Estudio</div>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-bold mb-2">Desglose de Quizzes</h3>
                <table className="w-full text-sm bg-white dark:bg-gray-800 rounded shadow">
                  <thead>
                    <tr className="text-left border-b">
                      <th className="p-2">Quiz</th>
                      <th className="p-2">Puntuación</th>
                      <th className="p-2">Fecha</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-2">Quiz 1</td>
                      <td className="p-2">8/10</td>
                      <td className="p-2">01/05/2024</td>
                    </tr>
                    <tr>
                      <td className="p-2">Quiz 2</td>
                      <td className="p-2">6/8</td>
                      <td className="p-2">03/05/2024</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div>
                <h3 className="font-bold mb-2">Áreas de Mejora</h3>
                <ul className="list-disc pl-6 text-sm text-gray-700 dark:text-gray-200">
                  <li>Repasar conceptos clave del Tema 2</li>
                  <li>Practicar preguntas de opción múltiple</li>
                </ul>
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  )
}