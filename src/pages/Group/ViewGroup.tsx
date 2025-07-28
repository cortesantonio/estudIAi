import { useEffect, useState } from "react"
import { AsideMenu } from "../../components/asideMenu"
import { useParams } from "react-router-dom"
import { GetGroup } from "../../services/groupService"
import type { Group } from "../../interfaces/Group"
import { Chat } from "./tabsViewGroup/tabChat"
import { GenerateQuizModal } from "./GenerateQuizModal"
import { GenerateFlashcards } from "./GenerateFlashcards"
import { supabase } from "../../services/supabaseService"
import type { Document } from "../../interfaces/Document"
import { getDocument, registerDocument } from "../../services/documentService"
import { ClipLoader } from "react-spinners"
import Quizzes from "./tabsViewGroup/tabQuizzes"
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
  const [documento, setDocumento] = useState<Document>()
  const [modalGenQuizzesisOpen, setModalGenQuizzesisOpen] = useState(false);
  const [modalGenFlashcardisOpen, setModalGenFlashcardisOpen] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);



  // se obtiene la informacion del grupo para ser mostrada en pantalla.
  useEffect(() => {
    async function fetchGroup(id: string) {
      try {
        const responseGroup = await GetGroup(id);
        const respondeDocument = await getDocument(responseGroup.id);
        setLoading(false)

        setGroup(responseGroup)
        setDocumento(respondeDocument)

      } catch (error) {
        setLoading(false)

        console.error(error)
      }

    }
    fetchGroup(id || "")
  }, [id])


  const handleUpload = async () => {
    if (!file) {
      console.warn('No se ha seleccionado ningún archivo');
      return;
    }

    // Validar tipo de archivo
    if (!file.type.includes('pdf')) {
      alert('Solo se permiten archivos PDF');
      return;
    }

    // Validar tamaño del archivo (máximo 10MB)
    const maxSize = 40 * 1024 * 1024; // 10MB en bytes
    if (file.size > maxSize) {
      alert('El archivo es demasiado grande. Máximo 10MB permitido.');
      return;
    }

    if (!group?.id) {
      alert('Error: No se pudo identificar el grupo');
      return;
    }

    setUploadLoading(true);

    try {
      // Generar nombre único para el archivo
      const timestamp = Date.now();
      const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
      const filePath = `${group.id}/${timestamp}_${sanitizedName}`;

      // Subir archivo a Supabase Storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('documentos')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) {
        throw new Error(`Error al subir archivo: ${uploadError.message}`);
      }

      // Obtener URL pública del archivo
      const { data: publicUrlData } = supabase.storage
        .from('documentos')
        .getPublicUrl(filePath);

      if (!publicUrlData?.publicUrl) {
        throw new Error('No se pudo obtener la URL pública del archivo');
      }

      // Crear objeto del documento
      const newDoc: Document = {
        title: file.name,
        fileUrl: publicUrlData.publicUrl,
        extractedText: "",
        uploadedAt: new Date(),
        studyGroupId: group.id
      };

      // Registrar documento en la base de datos
      await registerDocument(newDoc);

      // Limpiar estado y mostrar éxito
      setFile(null);
      alert('Documento subido exitosamente');

      // Recargar la página para mostrar el nuevo documento
      window.location.reload();

    } catch (error) {
      console.error('Error en handleUpload:', error);

      // Mostrar mensaje de error específico al usuario
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido al subir el archivo';
      alert(`Error: ${errorMessage}`);

    } finally {
      setUploadLoading(false);
    }
  };




  return (
    <div className="bg-gray-100 dark:bg-gray-700 min-h-screen">
      <AsideMenu />
      <GenerateQuizModal isOpen={modalGenQuizzesisOpen} onClose={() => setModalGenQuizzesisOpen(false)} onSuccess={() => { window.location.reload() }} groupId={group?.id} />
      <GenerateFlashcards isOpen={modalGenFlashcardisOpen} onClose={() => setModalGenFlashcardisOpen(false)} onSuccess={() => { window.location.reload() }} groupId={group?.id || 0} />

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

            {!group && <>
              <div className="w-full h-10 sm:w-50 rounded-lg bg-gray-500 animate-pulse"></div>
            </>}

            {documento?.fileUrl &&
              <>
                <button onClick={() => window.open(documento.fileUrl, '_blank')} className="w-full h-10 sm:w-50 bg-blue-600 hover:bg-blue-700  text-white rounded-lg font-semibold shadow transition-colors text-sm flex justify-center items-center gap-2 cursor-pointer" title="Descargar material de estudio">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4" /></svg>
                  Descargar material
                </button>
              </>
            }

            {!documento?.fileUrl && !loading &&
              <>
                {file == null ?
                  <>
                    <label
                      htmlFor="File"
                      className="block rounded border border-gray-300 bg-white p-4 text-gray-900 shadow-sm sm:p-3 sm:px-6 dark:border-gray-600
                       dark:bg-gray-700 dark:text-white cursor-pointer "
                    >

                      <div className="flex items-center justify-center gap-4">
                        <p className=" font-semibold dark:text-white">
                          Sube tu documento <br />
                          <span className="text-sm font-light ">(Solo pdf)</span>
                        </p>

                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="size-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M7.5 7.5h-.75A2.25 2.25 0 0 0 4.5 9.75v7.5a2.25 2.25 0 0 0 2.25 2.25h7.5a2.25 2.25 0 0 0 2.25-2.25v-7.5a2.25 2.25 0 0 0-2.25-2.25h-.75m0-3-3-3m0 0-3 3m3-3v11.25m6-2.25h.75a2.25 2.25 0 0 1 2.25 2.25v7.5a2.25 2.25 0 0 1-2.25 2.25h-7.5a2.25 2.25 0 0 1-2.25-2.25v-.75"
                          />
                        </svg>
                      </div>

                      <input
                        type="file"
                        id="File"
                        className="sr-only"
                        onChange={(e) => setFile(e.target.files?.[0] || null)}
                      />



                      <input
                        type="file"
                        id="File"
                        className="sr-only"
                        onChange={(e) => setFile(e.target.files?.[0] || null)}
                      />
                    </label>
                  </>
                  : <div className=" h-20 flex items-center justify-between gap-5 text-right ">
                    {uploadLoading ?
                      <>
                        <ClipLoader color="#0ea5e9" />
                        <p className="dark:text-white">Subiendo archivo, espere un momento.</p>

                      </>

                      : <>
                        <p className="font-light text-sm leading-1 dark:text-white">
                          Estas seguro(a) de subir este archivo:
                          <br />
                          <span className="font-semibold text-base">{file.name}</span>
                        </p>
                        <div className="flex gap-1">
                          <button className="px-1 py-2 rounded-lg bg-gray-400 hover:bg-gray-500  dark:bg-gray-600 dark:hover:bg-gray-700 flex items-center justify-center cursor-pointer"
                            onClick={() => setFile(null)}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" /></svg>
                          </button>
                          <button className="px-1 py-2 sm:w-50 bg-green-600 hover:bg-green-700  text-white rounded-lg font-semibold shadow transition-colors text-sm flex justify-center items-center gap-2 cursor-pointer"
                            onClick={handleUpload}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M120-160v-640l760 320-760 320Zm80-120 474-200-474-200v140l240 60-240 60v140Zm0 0v-400 400Z" /></svg>
                            Confirmar envio
                          </button>
                        </div>
                      </>}



                  </div>}
              </>
            }


          </div>
          {/* Tabs */}
          <div
            inert={!documento}
            style={!documento ? { opacity: 0.5, pointerEvents: 'none' } : {}}
            className="flex gap-2 border-b border-gray-300 dark:border-gray-600 mb-6 overflow-auto">
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
        <div
          inert={documento == null}
          style={documento == null ? { opacity: 0.5, pointerEvents: 'none' } : {}}
          className="w-full px-6 mx-auto pb-12 ">

          <Chat isOpen={tab === "chat"} group={group as Group} />
          <Quizzes isOpen={tab === "quizzes"} group={group as Group} modalFlashcardsIsOpen={() => setModalGenFlashcardisOpen(!modalGenFlashcardisOpen)} modalQuizzesIsOpen={() => setModalGenQuizzesisOpen(!modalGenQuizzesisOpen)} />

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
      </main >
    </div >
  )
}