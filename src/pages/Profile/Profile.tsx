import { useNavigate } from "react-router-dom"
import { AsideMenu } from "../../components/asideMenu"
import { EditProfileModal } from "../../components/EditProfileModal"
import { useEffect, useState } from "react"
import { useLogout } from "../../hooks/useLogout"
import { GetGroupsOf } from "../../services/groupService"
import type { Group } from "../../interfaces/Group"

export const Profile = () => {
    const navigate = useNavigate()
    const [user, setUser] = useState<any>();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const { logout } = useLogout()
    const [groups, setGroups] = useState<Group[]>([])
    useEffect(() => {
        const session = localStorage.getItem("user")
        if (session) {
            setUser(JSON.parse(session))
        }
    }, [])

    const handleSaveProfile = (updatedUser: any) => {
        setUser(updatedUser)
        localStorage.setItem("user", JSON.stringify(updatedUser))
    }
    useEffect(() => {
        async function GetGroups() {
            const groups = await GetGroupsOf()
            setGroups(groups)
        }
        GetGroups()
    }, [user])
    return (
        <div className="bg-gray-100 dark:bg-gray-700">
            <EditProfileModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                user={user}
                onSave={handleSaveProfile}
            />
            <AsideMenu />
            <main className="ease-soft-in-out lg:ml-68.5 relative min-h-screen   rounded-xl transition-all duration-200 ">
                <nav
                    className="absolute z-20 flex flex-wrap items-center justify-between w-full px-6 py-2 text-white transition-all shadow-none duration-250 ease-soft-in lg:flex-nowrap lg:justify-start"
                    navbar-profile navbar-scroll="true">
                    <div className="flex items-center justify-between w-full px-6 py-1 mx-auto flex-wrap-inherit">
                        <nav>
                            <ol className="flex flex-wrap pt-1 pl-2 pr-4 mr-12 bg-transparent rounded-lg sm:mr-16">
                                <li className="leading-normal text-sm">
                                    <a className="opacity-50" href="javascript:;">Inicio</a>
                                </li>
                                <li className="text-sm pl-2 capitalize leading-normal before:float-left before:pr-2 before:content-['/']"
                                    aria-current="page">Profile</li>
                            </ol>
                            <h6 className="mb-2 ml-2 font-bold text-white capitalize">Perfil</h6>
                        </nav>


                    </div>
                </nav>
                <div className="w-full px-6 mx-auto">
                    <div className="relative flex items-center p-0  overflow-hidden bg-center bg-cover min-h-75 rounded-2xl "
                        style={{ backgroundImage: "url(/curved0.jpg)", backgroundPositionY: "50%" }}>
                        <span
                            className="absolute inset-y-0 w-full h-full bg-center bg-cover bg-gradient-to-tl from-purple-700 to-pink-500 opacity-60"></span>
                    </div>
                    <div
                        className="relative flex flex-col flex-auto min-w-0 p-4 mx-6 -mt-16 overflow-hidden break-words border-0 shadow-blur rounded-2xl bg-white/80 dark:bg-gray-800 dark:text-white bg-clip-border backdrop-blur-2xl backdrop-saturate-200">
                        <div className="flex flex-wrap -mx-3">
                            <div className="flex-none w-auto max-w-full px-3">
                                <div
                                    className="text-base ease-soft-in-out h-18.5 w-18.5 relative inline-flex items-center justify-center rounded-xl text-white transition-all duration-200">
                                    <img src="https://avatar.iran.liara.run/public" alt="profile_image" className="w-full shadow-soft-sm rounded-xl" />
                                </div>
                            </div>
                            <div className="flex-none w-auto max-w-full px-3 my-auto">
                                <div className="h-full">
                                    <h5 className="mb-1 font-semibold capitalize">{user?.name}</h5>
                                    <p className="mb-0  leading-normal text-sm">{user?.career || "Carrera sin especificar"}</p>
                                </div>
                            </div>
                            <div className="w-full max-w-full px-3 mx-auto mt-4 sm:my-auto sm:mr-0 md:w-1/2 md:flex-none lg:w-4/12">
                                <div className="relative right-0">
                                    <ul className="relative flex flex-wrap p-1 list-none bg-transparent rounded-xl gap-4" nav-pills role="tablist">
                                        <li className="z-30 flex-auto text-center  ">
                                            <a className="z-30  w-full px-0 py-1 mb-0 transition-colors border-0 rounded-lg ease-soft-in-out  text-slate-700 flex justify-center cursor-pointer dark:bg-gray-600 dark:lg:hover:bg-gray-700 lg:bg-gray-100/50 lg:hover:bg-white bg-gray-100 hover:bg-gray-200"
                                                aria-selected="false"
                                                onClick={() => navigate("/groups")}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="dark:fill-white" height="24px" viewBox="0 -960 960 960" width="24px"
                                                >
                                                    <path d="M-16-224v-79q0-51 49-82t127-31h17q-17 25-25 52.86T144-305v81H-16Zm240 0v-81q0-35 18-65t53-52q35-22 82-33t102.96-11q57.04 0 103.54 11 46.5 11 81.5 33t53 52q18 30 18 65v81H224Zm592 0v-81q0-31.37-8-59.12-8-27.75-24-51.88h16q79.2 0 127.6 30.87Q976-354.26 976-303v79H816ZM354-331h253q-21-13-56-21t-70.5-8q-35.5 0-71 8T354-331ZM160.09-452Q123-452 96.5-478.39 70-504.77 70-541.82 70-580 96.39-606q26.38-26 63.43-26Q198-632 224-606.15q26 25.85 26 64.06 0 37.09-25.85 63.59T160.09-452Zm640 0q-37.09 0-63.59-26.39-26.5-26.38-26.5-63.43Q710-580 736.39-606q26.38-26 63.43-26Q838-632 864-606.15q26 25.85 26 64.06 0 37.09-25.85 63.59T800.09-452ZM480-495q-56.67 0-96.33-39.67Q344-574.33 344-631q0-57 39.67-96.5Q423.33-767 480-767q57 0 96.5 39.5T616-631q0 56.67-39.5 96.33Q537-495 480-495Zm.5-106q12.5 0 21-9t8.5-21.5q0-12.5-8.62-21-8.63-8.5-21.38-8.5-12 0-21 8.62-9 8.63-9 21.38 0 12 9 21t21.5 9Zm.5 270Zm-1-300Z" />
                                                </svg>

                                                <span className="ml-1 dark:text-white ">Grupos</span>
                                            </a>
                                        </li>
                                        <li className="z-30 flex-auto text-center  ">
                                            <button
                                                className="z-30  w-full px-0 py-1 mb-0 transition-colors border-0 rounded-lg ease-soft-in-out  text-slate-700 flex justify-center cursor-pointer dark:bg-gray-600 dark:lg:hover:bg-gray-700 lg:bg-gray-100/50 lg:hover:bg-white bg-gray-100 hover:bg-gray-200"
                                                onClick={() => setIsEditModalOpen(true)}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" className="dark:fill-white" >
                                                    <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l9 9q12 11 18 26.5t6 30.5q0 16-6 30.5T793-647L264-120H120Zm640-584-56-56 56 56Zm-141 141-28-29 57 57-29-28Z" />
                                                </svg>

                                                <span className="ml-1 dark:text-white">Editar Perfil</span>
                                            </button>
                                        </li>
                                        <li className="z-30 flex-auto text-center">
                                            <button
                                                className="z-30 w-full px-0 py-1 mb-0 transition-all duration-200 border-0 rounded-lg ease-soft-in-out text-slate-700 flex justify-center cursor-pointer bg-gradient-to-tl from-red-500/10 to-pink-500/10 hover:from-red-500/20 hover:to-pink-500/20 dark:from-red-500/20 dark:to-pink-500/20 dark:hover:from-red-500/30 dark:hover:to-pink-500/30 group"
                                                onClick={() => {
                                                    logout()
                                                }}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" className="transition-colors duration-200 group-hover:text-red-500 dark:text-red-400 dark:fill-red-400">
                                                    <path d="M212-86q-53 0-89.5-36.5T86-212v-536q0-53 36.5-89.5T212-874h276v126H212v536h276v126H212Zm415-146-88-89 96-96H352v-126h283l-96-96 88-89 247 248-247 248Z" />
                                                </svg>

                                                <span className="ml-1 font-semibold transition-colors duration-200 group-hover:text-red-500 dark:text-red-400">Cerrar Sesión</span>
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-full px-6 py-6 mx-auto">
                    <div className="flex flex-wrap mx-3 ">
                        <div className="w-full max-w-full px-3 mb-6 sm:w-1/2 sm:flex-none xl:mb-0 xl:w-1/4 ">
                            <div className="relative flex flex-col min-w-0 break-words bg-white dark:bg-gray-800 shadow-soft-xl rounded-2xl bg-clip-border">
                                <div className="flex-auto p-4">
                                    <div className="flex flex-row -mx-3 justify-between">
                                        <div className="flex-none w-2/3 max-w-full px-3">
                                            <div>
                                                <p className="mb-0 font-sans font-semibold leading-normal text-sm dark:text-white">Respuestas Correctas</p>
                                                <h5 className="mb-0 font-bold dark:text-white">
                                                    -- <span className="leading-normal text-sm font-weight-bolder text-lime-500">--%</span>
                                                </h5>
                                            </div>
                                        </div>
                                        <div className="px-3 text-right ">
                                            <div className=" w-12 h-12 rounded-lg bg-gradient-to-tl from-purple-700 to-pink-500 flex justify-center items-center" >
                                                <svg className="w-6 h-6  text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                                    <path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm13.707-1.293a1 1 0 0 0-1.414-1.414L11 12.586l-1.793-1.793a1 1 0 0 0-1.414 1.414l2.5 2.5a1 1 0 0 0 1.414 0l4-4Z" clip-rule="evenodd" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="w-full max-w-full px-3 mb-6 sm:w-1/2 sm:flex-none xl:mb-0 xl:w-1/4 ">
                            <div className="relative flex flex-col min-w-0 break-words bg-white dark:bg-gray-800 shadow-soft-xl rounded-2xl bg-clip-border">
                                <div className="flex-auto p-4">
                                    <div className="flex flex-row -mx-3 justify-between">
                                        <div className="flex-none w-2/3 max-w-full px-3">
                                            <div>
                                                <p className="mb-0 font-sans font-semibold leading-normal text-sm dark:text-white">Quiz jugados</p>
                                                <h5 className="mb-0 font-bold dark:text-white">
                                                    -- <span className="leading-normal text-sm font-weight-bolder text-lime-500">--%</span>
                                                </h5>
                                            </div>
                                        </div>
                                        <div className="px-3 text-right">
                                            <div className=" w-12 h-12 rounded-lg bg-gradient-to-tl from-purple-700 to-pink-500 flex justify-center items-center" >
                                                <svg className="w-6 h-6  text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                                    <path fill-rule="evenodd" d="M7.05 4.05A7 7 0 0 1 19 9c0 2.407-1.197 3.874-2.186 5.084l-.04.048C15.77 15.362 15 16.34 15 18a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1c0-1.612-.77-2.613-1.78-3.875l-.045-.056C6.193 12.842 5 11.352 5 9a7 7 0 0 1 2.05-4.95ZM9 21a1 1 0 0 1 1-1h4a1 1 0 1 1 0 2h-4a1 1 0 0 1-1-1Zm1.586-13.414A2 2 0 0 1 12 7a1 1 0 1 0 0-2 4 4 0 0 0-4 4 1 1 0 0 0 2 0 2 2 0 0 1 .586-1.414Z" clip-rule="evenodd" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="w-full max-w-full px-3 mb-6 sm:w-1/2 sm:flex-none xl:mb-0 xl:w-1/4">
                            <div className="relative flex flex-col min-w-0 break-words bg-white dark:bg-gray-800 shadow-soft-xl rounded-2xl bg-clip-border">
                                <div className="flex-auto p-4">
                                    <div className="flex flex-row -mx-3 justify-between">
                                        <div className="flex-none w-2/3 max-w-full px-3">
                                            <div>
                                                <p className="mb-0 font-sans font-semibold leading-normal text-sm dark:text-white">Sesiones hechas</p>
                                                <h5 className="mb-0 font-bold dark:text-white">
                                                    -- <span className="leading-normal text-sm font-weight-bolder text-lime-500">--%</span>
                                                </h5>
                                            </div>
                                        </div>
                                        <div className="px-3 text-right ">
                                            <div className="w-12 h-12 text-center rounded-lg bg-gradient-to-tl from-purple-700 to-pink-500 flex justify-center items-center">
                                                <svg className="w-[24px] h-[24px]  text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                                    <path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm9.008-3.018a1.502 1.502 0 0 1 2.522 1.159v.024a1.44 1.44 0 0 1-1.493 1.418 1 1 0 0 0-1.037.999V14a1 1 0 1 0 2 0v-.539a3.44 3.44 0 0 0 2.529-3.256 3.502 3.502 0 0 0-7-.255 1 1 0 0 0 2 .076c.014-.398.187-.774.48-1.044Zm.982 7.026a1 1 0 1 0 0 2H12a1 1 0 1 0 0-2h-.01Z" clip-rule="evenodd" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="w-full max-w-full px-3 sm:w-1/2 sm:flex-none xl:w-1/4">
                            <div className="relative flex flex-col min-w-0 break-words bg-white dark:bg-gray-800 shadow-soft-xl rounded-2xl bg-clip-border">
                                <div className="flex-auto p-4">
                                    <div className="flex flex-row -mx-3 justify-between">
                                        <div className="flex-none w-2/3 max-w-full px-3">
                                            <div>
                                                <p className="mb-0 font-sans font-semibold leading-normal text-sm dark:text-white">Grupos activos</p>
                                                <h5 className="mb-0 font-bold dark:text-white">
                                                    -- <span className="leading-normal text-sm font-weight-bolder text-lime-500">--%</span>
                                                </h5>
                                            </div>
                                        </div>
                                        <div className="px-3 text-right ">
                                            <div className="w-12 h-12 text-center rounded-lg bg-gradient-to-tl from-purple-700 to-pink-500 flex justify-center items-center">
                                                <svg className="w-[24px] h-[24px]  text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                                    <path fill-rule="evenodd" d="M12 6a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm-1.5 8a4 4 0 0 0-4 4 2 2 0 0 0 2 2h7a2 2 0 0 0 2-2 4 4 0 0 0-4-4h-3Zm6.82-3.096a5.51 5.51 0 0 0-2.797-6.293 3.5 3.5 0 1 1 2.796 6.292ZM19.5 18h.5a2 2 0 0 0 2-2 4 4 0 0 0-4-4h-1.1a5.503 5.503 0 0 1-.471.762A5.998 5.998 0 0 1 19.5 18ZM4 7.5a3.5 3.5 0 0 1 5.477-2.889 5.5 5.5 0 0 0-2.796 6.293A3.501 3.501 0 0 1 4 7.5ZM7.1 12H6a4 4 0 0 0-4 4 2 2 0 0 0 2 2h.5a5.998 5.998 0 0 1 3.071-5.238A5.505 5.505 0 0 1 7.1 12Z" clip-rule="evenodd" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-wrap mt-6 -mx-3">
                        <div className="w-full px-3 mb-6 lg:mb-0 lg:w-7/12 lg:flex-none">
                            <div className="relative flex flex-col min-w-0 break-words bg-white dark:bg-gray-800 shadow-soft-xl rounded-2xl bg-clip-border">
                                <div className="flex-auto p-4">
                                    <div className="flex flex-wrap -mx-3 ">
                                        <div className="max-w-full px-3 mt-12 mr-auto text-center lg:mt-0 lg:w-5/12 lg:flex-none hidden md:block">
                                            <div className="h-full max-h-[280px] bg-gradient-to-tl from-purple-700 to-pink-500 rounded-xl" >
                                                <div className="relative flex items-center justify-center h-full overflow-hidden">
                                                    <img
                                                        className="relative z-20 h-full object-cover"
                                                        src="/addGroup.png"
                                                        alt="student group"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="max-w-full px-3 lg:w-1/2 lg:flex-none">
                                            <div className="flex flex-col h-full dark:text-white">
                                                <p className="pt-2 mb-1 font-semibold">¡Prepárate para aprender!</p>
                                                <h5 className="font-bold text-2xl">Crear un grupo y comenzar</h5>
                                                <p className="mb-12">Organiza a tus amigos o compañeros y empieza el quiz en segundos.</p>
                                                <button
                                                    className="mt-auto mb-0 inline-flex items-center justify-center px-6 py-3 font-semibold leading-normal text-sm text-white transition-all duration-200 ease-in-out bg-gradient-to-tl from-purple-700 to-pink-500 rounded-lg shadow-md  hover:saturate-50 cursor-pointer "
                                                    onClick={() => navigate("/groups")}
                                                >
                                                    <svg className="w-6 h-6  text-white mr-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                                        <path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4.243a1 1 0 1 0-2 0V11H7.757a1 1 0 1 0 0 2H11v3.243a1 1 0 1 0 2 0V13h3.243a1 1 0 1 0 0-2H13V7.757Z" clip-rule="evenodd" />
                                                    </svg> Crear grupo y comenzar quiz
                                                </button>
                                            </div>
                                        </div>

                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="w-full max-w-full px-3 lg:w-5/12 lg:flex-none ">
                            <div className="border-black/12.5 shadow-soft-xl relative flex h-full min-w-0 flex-col break-words rounded-2xl border-0 border-solid bg-white bg-clip-border p-4 dark:bg-gray-800">
                                <div className="relative h-full overflow-hidden bg-cover rounded-xl" style={{ backgroundImage: "url('https://images.stockcake.com/public/a/d/7/ad7d034f-7611-4138-98a5-7038be6d8a1e_large/students-studying-together-stockcake.jpg')" }}>
                                    <span className="absolute top-0 left-0 w-full h-full bg-center bg-cover bg-gradient-to-tl from-gray-900 to-slate-800 opacity-80"></span>
                                    <div className="relative z-10 flex flex-col flex-auto h-full p-4">
                                        <h5 className="pt-2 mb-6 font-bold text-white">Aprende mejor con quizzes</h5>
                                        <p className="text-white">
                                            Practicar con quizzes es una de las formas más efectivas de estudiar. Al ponerte a prueba con preguntas relacionadas a lo que estás aprendiendo, activas la memoria de forma activa en lugar de solo leer o repasar pasivamente. Esto no solo mejora la retención de información, sino que también te ayuda a identificar en qué áreas necesitas enfocarte más.
                                        </p>
                                        <p className="mt-2 text-white truncate">
                                            Además, al transformar el estudio en una dinámica interactiva, los quizzes hacen que el proceso sea más entretenido y motivador. Ya sea que estudies solo o en grupo, usar quizzes te prepara de manera más completa para exámenes reales y situaciones prácticas.
                                        </p>
                                        <a className="mt-auto mb-0 font-semibold leading-normal text-white group text-sm bg-gray-700 w-fit px-4 py-1 rounded-lg hover:saturate-50 cursor-pointer" >
                                            Leer mas
                                            <i className="fas fa-arrow-right ease-bounce text-sm group-hover:translate-x-1.25 ml-1 leading-normal transition-all duration-200"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>





                    <div className="flex flex-wrap my-6 -mx-3">

                        <div className="w-full max-w-full px-3 mt-0 mb-6 md:mb-0 md:w-1/2 md:flex-none lg:w-2/3 lg:flex-none">
                            <div className="border-black/12.5 shadow-soft-xl relative flex min-w-0 flex-col break-words rounded-2xl border-0 border-solid bg-white bg-clip-border dark:bg-gray-800 dark:text-white">
                                <div className="border-black/12.5 mb-0 rounded-t-2xl border-b-0 border-solid   p-6 pb-0">
                                    <div className="flex flex-wrap mt-0 -mx-3">
                                        <div className="flex-none w-7/12 max-w-full px-3 mt-0 lg:w-1/2 lg:flex-none">
                                            <h6>Grupos</h6>
                                            <p className="mb-0 leading-normal text-sm dark:text-gray-500 flex items-center">
                                                <svg className="w-4 h-4  text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                                    <path fill-rule="evenodd" d="M12 2c-.791 0-1.55.314-2.11.874l-.893.893a.985.985 0 0 1-.696.288H7.04A2.984 2.984 0 0 0 4.055 7.04v1.262a.986.986 0 0 1-.288.696l-.893.893a2.984 2.984 0 0 0 0 4.22l.893.893a.985.985 0 0 1 .288.696v1.262a2.984 2.984 0 0 0 2.984 2.984h1.262c.261 0 .512.104.696.288l.893.893a2.984 2.984 0 0 0 4.22 0l.893-.893a.985.985 0 0 1 .696-.288h1.262a2.984 2.984 0 0 0 2.984-2.984V15.7c0-.261.104-.512.288-.696l.893-.893a2.984 2.984 0 0 0 0-4.22l-.893-.893a.985.985 0 0 1-.288-.696V7.04a2.984 2.984 0 0 0-2.984-2.984h-1.262a.985.985 0 0 1-.696-.288l-.893-.893A2.984 2.984 0 0 0 12 2Zm3.683 7.73a1 1 0 1 0-1.414-1.413l-4.253 4.253-1.277-1.277a1 1 0 0 0-1.415 1.414l1.985 1.984a1 1 0 0 0 1.414 0l4.96-4.96Z" clip-rule="evenodd" />
                                                </svg>
                                                <span className="mx-1 font-semibold ">-- grupos nuevos </span> este mes
                                            </p>
                                        </div>
                                        <div className="flex-none w-5/12 max-w-full px-3 my-auto text-right lg:w-1/2 lg:flex-none">
                                            <div className="relative pr-6 lg:float-right">
                                                <a dropdown-trigger className="cursor-pointer" aria-expanded="false">
                                                    <i className="fa fa-ellipsis-v text-slate-400"></i>
                                                </a>
                                                <p className="hidden transform-dropdown-show"></p>

                                                <ul dropdown-menu className="z-100 text-sm transform-dropdown shadow-soft-3xl duration-250 before:duration-350 before:font-awesome before:ease-soft min-w-44 -ml-34 before:text-5.5 pointer-events-none absolute top-0 m-0 mt-2 list-none rounded-lg border-0 border-solid border-transparent bg-white bg-clip-padding px-2 py-4 text-left text-slate-500 opacity-0 transition-all before:absolute before:top-0 before:right-7 before:left-auto before:z-40 before:text-white before:transition-all before:content-['\f0d8']">
                                                    <li className="relative">
                                                        <a className="py-1.2 lg:ease-soft clear-both block w-full whitespace-nowrap rounded-lg border-0 bg-transparent px-4 text-left font-normal text-slate-500 lg:transition-colors lg:duration-300"  >Action</a>
                                                    </li>
                                                    <li className="relative">
                                                        <a className="py-1.2 lg:ease-soft clear-both block w-full whitespace-nowrap rounded-lg border-0 bg-transparent px-4 text-left font-normal text-slate-500 lg:transition-colors lg:duration-300"  >Another action</a>
                                                    </li>
                                                    <li className="relative">
                                                        <a className="py-1.2 lg:ease-soft clear-both block w-full whitespace-nowrap rounded-lg border-0 bg-transparent px-4 text-left font-normal text-slate-500 lg:transition-colors lg:duration-300"  >Something else here</a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex-auto p-6 px-0 pb-2">
                                    <div className="overflow-x-auto">
                                        <table className="items-center w-full mb-0 align-top border-gray-200 text-slate-500 ">
                                            <thead className="align-bottom">
                                                <tr>
                                                    <th className="px-6 py-3 font-bold tracking-normal text-left uppercase align-middle bg-transparent border-b letter border-b-solid text-xxs whitespace-nowrap border-b-gray-200 text-slate-400 opacity-70">GRUPOS</th>
                                                    <th className="px-6 py-3 pl-2 font-bold tracking-normal text-left uppercase align-middle bg-transparent border-b letter border-b-solid text-xxs whitespace-nowrap border-b-gray-200 text-slate-400 opacity-70">MIEMBROS</th>
                                                    <th className="px-6 py-3 font-bold tracking-normal text-center uppercase align-middle bg-transparent border-b letter border-b-solid text-xxs whitespace-nowrap border-b-gray-200 text-slate-400 opacity-70">Juegos pendientes</th>
                                                    <th className="px-6 py-3 font-bold tracking-normal text-center uppercase align-middle bg-transparent border-b letter border-b-solid text-xxs whitespace-nowrap border-b-gray-200 text-slate-400 opacity-70"></th>
                                                </tr>
                                            </thead>
                                            <tbody >
                                                {/* <tr className=" mb-4">
                                                    <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap">
                                                        <div className="flex px-2 py-1">
                                                            <div className="size-10 aspect-square mr-2" >
                                                                <img src="https://images.icon-icons.com/1617/PNG/512/3700472-biology-chemical-chemistry-ecology-flask-laboratory-science_108761.png" className="inline-flex items-center justify-center mr-4 text-white transition-all duration-200 ease-soft-in-out text-sm h-9 w-9 rounded-xl bg-white" alt="xd" />
                                                            </div>
                                                            <div className="flex flex-col justify-center">
                                                                <h6 className="mb-0 leading-normal text-sm ">Bioquímica certamen 3</h6>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap">
                                                        <div className="mt-2 avatar-group">
                                                            <a className="relative z-20 inline-flex items-center justify-center w-6 h-6 text-white transition-all duration-200 border-2 border-white border-solid rounded-full ease-soft-in-out text-xs hover:z-30" data-target="tooltip_trigger" data-placement="bottom">
                                                                <img src="https://avatar.iran.liara.run/public" className="w-full rounded-full" alt="team1" />
                                                            </a>
                                                            <div data-target="tooltip" className="hidden px-2 py-1 text-white bg-black rounded-lg text-sm" role="tooltip">
                                                                Ryan Tompson
                                                                <div className="invisible absolute h-2 w-2 bg-inherit before:visible before:absolute before:h-2 before:w-2 before:rotate-45 before:bg-inherit before:content-['']" data-popper-arrow></div>
                                                            </div>
                                                            <a className="relative z-20 inline-flex items-center justify-center w-6 h-6 -ml-4 text-white transition-all duration-200 border-2 border-white border-solid rounded-full ease-soft-in-out text-xs hover:z-30" data-target="tooltip_trigger" data-placement="bottom">
                                                                <img src="https://avatar.iran.liara.run/public" className="w-full rounded-full" alt="team2" />
                                                            </a>
                                                            <div data-target="tooltip" className="hidden px-2 py-1 text-white bg-black rounded-lg text-sm" role="tooltip">
                                                                Romina Hadid
                                                                <div className="invisible absolute h-2 w-2 bg-inherit before:visible before:absolute before:h-2 before:w-2 before:rotate-45 before:bg-inherit before:content-['']" data-popper-arrow></div>
                                                            </div>
                                                            <a className="relative z-20 inline-flex items-center justify-center w-6 h-6 -ml-4 text-white transition-all duration-200 border-2 border-white border-solid rounded-full ease-soft-in-out text-xs hover:z-30" data-target="tooltip_trigger" data-placement="bottom">
                                                                <img src="https://avatar.iran.liara.run/public" className="w-full rounded-full" alt="team3" />
                                                            </a>
                                                            <div data-target="tooltip" className="hidden px-2 py-1 text-white bg-black rounded-lg text-sm" role="tooltip">
                                                                Alexander Smith
                                                                <div className="invisible absolute h-2 w-2 bg-inherit before:visible before:absolute before:h-2 before:w-2 before:rotate-45 before:bg-inherit before:content-['']" data-popper-arrow></div>
                                                            </div>
                                                            <a className="relative z-20 inline-flex items-center justify-center w-6 h-6 -ml-4 text-white transition-all duration-200 border-2 border-white border-solid rounded-full ease-soft-in-out text-xs hover:z-30" data-target="tooltip_trigger" data-placement="bottom">
                                                                <img src="https://avatar.iran.liara.run/public" className="w-full rounded-full" alt="team4" />
                                                            </a>
                                                            <div data-target="tooltip" className="hidden px-2 py-1 text-white bg-black rounded-lg text-sm" role="tooltip">
                                                                Jessica Doe
                                                                <div className="invisible absolute h-2 w-2 bg-inherit before:visible before:absolute before:h-2 before:w-2 before:rotate-45 before:bg-inherit before:content-['']" data-popper-arrow></div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="p-2 leading-normal text-center align-middle bg-transparent border-b text-sm whitespace-nowrap">
                                                        <span className="font-semibold leading-tight text-xs"> 4 </span>
                                                    </td>
                                                    <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap">
                                                        <div className="w-3/4 mx-auto">
                                                            <div>
                                                                <div>
                                                                    <span className="font-semibold leading-tight text-xs">100%</span>
                                                                </div>
                                                            </div>
                                                            <div className="text-xs h-0.75 w-30 m-0 flex overflow-visible rounded-lg bg-gray-200">
                                                                <div className="duration-600 ease-soft bg-gradient-to-tl from-blue-600 to-cyan-400 -mt-0.38 -ml-px flex h-1.5  flex-col justify-center overflow-hidden whitespace-nowrap rounded bg-fuchsia-500 text-center text-white transition-all w-4/5"></div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr> */}

                                                {groups.map((group) => (
                                                    <tr key={group.id} className=" mb-4">
                                                        <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap">
                                                            <div className="flex  " >
                                                                <div className="w-2 rounded-l-lg mr-2 border-1 border-gray-800" style={{ backgroundColor: `${group.hexColor}` }}></div>
                                                                <div className="flex flex-col justify-center ">
                                                                    <h6 className="mb-0 leading-normal text-sm ">{group.name}</h6>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap">
                                                            <span className="font-semibold leading-tight text-xs">100%</span>
                                                        </td>
                                                        <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap">
                                                            <div className="w-3/4 mx-auto">
                                                                <div>
                                                                    <div>
                                                                        <span className="font-semibold leading-tight text-xs">100%</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap">
                                                            <div className="w-3/4 mx-auto">
                                                                <div>
                                                                    <div>
                                                                        <span className="font-semibold leading-tight text-xs">100%</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}

                                            </tbody>
                                        </table>
                                    </div>

                                </div>

                            </div>

                        </div>
                        <div className="w-full max-w-full px-3 md:w-1/2 md:flex-none lg:w-1/3 lg:flex-none ">
                            <div className="border-black/12.5 shadow-soft-xl relative flex h-full min-w-0 flex-col break-words rounded-2xl border-0 border-solid bg-white dark:bg-gray-800 bg-clip-border">
                                <div className="border-black/12.5 mb-0 rounded-t-2xl border-b-0 border-solid bg-white p-6 pb-0 dark:bg-gray-800 dark:text-white">
                                    <h6>Actividad de tus grupos</h6>
                                    <p className="leading-normal text-sm flex items-center">
                                        <svg className="w-4 h-4  text-white mr-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 12H5m14 0-4 4m4-4-4-4" />
                                        </svg>
                                        <span className="font-semibold mr-1">24 </span> este mes
                                    </p>
                                </div>
                                <div className="flex-auto p-4  ">
                                    <div className="before:border-r-solid relative before:absolute before:top-0 before:left-4 before:h-full before:border-r-2 before:border-r-slate-100 before:content-[''] before:lg:-ml-px">
                                        <div className="relative mb-4 mt-0 after:clear-both after:table after:content-['']">
                                            <span className="w-6.5 h-6.5 text-base absolute left-4 z-10 inline-flex -translate-x-1/2 items-center justify-center rounded-full bg-white dark:bg-gray-800 text-center font-semibold">
                                                <svg className="w-6 h-6  text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M17.133 12.632v-1.8a5.406 5.406 0 0 0-4.154-5.262.955.955 0 0 0 .021-.106V3.1a1 1 0 0 0-2 0v2.364a.955.955 0 0 0 .021.106 5.406 5.406 0 0 0-4.154 5.262v1.8C6.867 15.018 5 15.614 5 16.807 5 17.4 5 18 5.538 18h12.924C19 18 19 17.4 19 16.807c0-1.193-1.867-1.789-1.867-4.175ZM8.823 19a3.453 3.453 0 0 0 6.354 0H8.823Z" />
                                                </svg>

                                            </span>

                                            <div className="ml-11 pt-1.4 lg:max-w-120 relative -top-1.5 w-auto">
                                                <h6 className="mb-0 font-semibold leading-normal text-sm text-slate-700 dark:text-white">Juanito Perez, completó un quiz en Bioquímica certamen 3.</h6>
                                                <p className="mt-1 mb-0 font-semibold leading-tight text-xs text-slate-400 dark:text-white/70 ">22 DEC 7:20 PM</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </main>

            {/* Edit Profile Modal */}
            <EditProfileModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                user={user}
                onSave={handleSaveProfile}
            />
        </div>
    )
}