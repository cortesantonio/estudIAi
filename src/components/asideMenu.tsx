import { useState } from "react"
import { Link } from "react-router-dom"
import { useLogout } from "../hooks/useLogout"

export const AsideMenu = () => {
    const [asideOpen, setAsideOpen] = useState(false);
    const [msjAviso, setMsjAviso] = useState(true)
    const { logout } = useLogout()

    return (
        <>

            <button data-drawer-target="cta-button-sidebar"
                data-drawer-toggle="cta-button-sidebar"
                aria-controls="cta-button-sidebar" type="button"
                className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                onClick={() => { setAsideOpen(!asideOpen) }}
            >

                <span className="sr-only">Open sidebar</span>
                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                </svg>
            </button>

            <aside id="cta-button-sidebar" className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${!asideOpen && "-translate-x-full"} lg:translate-x-0`} aria-label="Sidebar">
                <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                    <ul className="space-y-2 font-medium">
                        <li className="flex items-center justify-between mb-5 ">
                            <Link to="/" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 w-full">
                                <svg xmlns="http://www.w3.org/2000/svg" className="dark:fill-gray-300 fill-gray-500" height="24px" viewBox="0 -960 960 960" width="24px" ><path d="M512-614v-286h388v286H512ZM60-414v-486h388v486H60ZM512-63v-486h388v486H512ZM60-63v-286h388v286H60Zm126-477h136v-234H186v234Zm452 351h136v-234H638v234Zm0-551h136v-34H638v34ZM186-189h136v-34H186v34Zm136-351Zm316-200Zm0 317ZM322-223Z" /></svg>
                                <span className="ms-3">Inicio</span>
                            </Link>
                            <button data-drawer-target="cta-button-sidebar"
                                data-drawer-toggle="cta-button-sidebar"
                                aria-controls="cta-button-sidebar" type="button"
                                className="inline-flex items-center p-2  ms-3 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100
                                 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                                onClick={() => { setAsideOpen(!asideOpen) }}
                            >

                                <span className="sr-only">Close sidebar</span>
                                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                                </svg>
                            </button>
                        </li>
                        <li>
                            <Link to="/groups" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" className="dark:fill-gray-300 fill-gray-500"><path d="M-16-224v-79q0-51 49-82t127-31h17q-17 25-25 52.86T144-305v81H-16Zm240 0v-81q0-35 18-65t53-52q35-22 82-33t102.96-11q57.04 0 103.54 11 46.5 11 81.5 33t53 52q18 30 18 65v81H224Zm592 0v-81q0-31.37-8-59.12-8-27.75-24-51.88h16q79.2 0 127.6 30.87Q976-354.26 976-303v79H816ZM354-331h253q-21-13-56-21t-70.5-8q-35.5 0-71 8T354-331ZM160.09-452Q123-452 96.5-478.39 70-504.77 70-541.82 70-580 96.39-606q26.38-26 63.43-26Q198-632 224-606.15q26 25.85 26 64.06 0 37.09-25.85 63.59T160.09-452Zm640 0q-37.09 0-63.59-26.39-26.5-26.38-26.5-63.43Q710-580 736.39-606q26.38-26 63.43-26Q838-632 864-606.15q26 25.85 26 64.06 0 37.09-25.85 63.59T800.09-452ZM480-495q-56.67 0-96.33-39.67Q344-574.33 344-631q0-57 39.67-96.5Q423.33-767 480-767q57 0 96.5 39.5T616-631q0 56.67-39.5 96.33Q537-495 480-495Zm.5-106q12.5 0 21-9t8.5-21.5q0-12.5-8.62-21-8.63-8.5-21.38-8.5-12 0-21 8.62-9 8.63-9 21.38 0 12 9 21t21.5 9Zm.5 270Zm-1-300Z" /></svg>
                                <span className="flex-1 ms-3 whitespace-nowrap">Grupos</span>
                                <span className="inline-flex items-center justify-center px-2 ms-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">Pro</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/quizzes" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" className="dark:fill-gray-300 fill-gray-500"><path d="M586-400q17 0 29.5-12.5T628-442q0-17-12.5-29.5T586-484q-17 0-29.5 12.5T544-442q0 17 12.5 29.5T586-400Zm-30-111h60q0-17 7.5-32.5T647-575q29-29 39.5-48.5T697-666q0-47-31-74.5T582.89-768q-41.89 0-72.39 22.5T469-685l54 22q8-23 23.5-36t36.41-13q25.09 0 39.59 13 14.5 13 14.5 34 0 14.48-8 27.41T601-605q-27 25-36 43.5t-9 50.5ZM355-229q-53 0-89.5-36.5T229-355v-456q0-53 36.5-89.5T355-937h456q53 0 89.5 36.5T937-811v456q0 53-36.5 89.5T811-229H355Zm0-126h456v-456H355v456ZM149-23q-53 0-89.5-36.5T23-149v-582h126v582h582v126H149Zm206-788v456-456Z" /></svg>
                                <span className="flex-1 ms-3 whitespace-nowrap">Quizzes</span>
                                <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">3</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/join-game" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" className="dark:fill-gray-300 fill-gray-500"><path d="M182-166q-69 0-105-50.5T49-330l40-297q11.11-72.61 66.06-119.8Q210-794 283-794h394q73 0 127.94 47.2Q859.89-699.61 871-627l40 297q8 64-29.5 114t-102.67 50q-26.83 0-51.33-10T684-205l-81.05-81H358l-81 81q-19 19-43.5 29T182-166Zm7-129 117-117h349l117 117q1 1 8 3 4.13 0 6.56-3 2.44-3 2.44-7l-44-308q-3-24-21.73-41T679-668H283q-25.54 0-44.27 17Q220-634 217-610l-44 308q0 4 1.5 7t5.5 3l9-3Zm486-151q17 0 28.5-11.5T715-486q0-17-11.5-28.5T675-526q-17 0-28.5 11.5T635-486q0 17 11.5 28.5T675-446Zm-70-109q17 0 28.5-11.5T645-595q0-17-11.5-28.5T605-635q-17 0-28.5 11.5T565-595q0 17 11.5 28.5T605-555ZM311-448h60v-62h62v-60h-62v-62h-60v62h-63v60h63v62Zm170-32Z" /></svg>
                                <span className="flex-1 ms-3 whitespace-nowrap">Unirse a juego</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/results" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" className="dark:fill-gray-300 fill-gray-500"><path d="M272-74v-126h145v-83q-49-14-89-43.5T265-401q-99 5-168-66.5T28-640v-40q0-53 36.5-89.5T154-806h80v-80h492v80h80q53 0 89.5 36.5T932-680v40q0 101-69 172.5T695-401q-23 45-63 74.5T543-283v83h145v126H272Zm-38-454v-152h-80v40q0 38 22 68.5t58 43.5Zm246 128q50 0 85-35t35-85v-240H360v240q0 50 35 85t85 35Zm246-128q36-13 58-43.5t22-68.5v-40h-80v152Zm-246-52Z" /></svg>
                                <span className="flex-1 ms-3 whitespace-nowrap">Resultados</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/auth/register" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" className="dark:fill-gray-300 fill-gray-500"><path d="M212-86q-53 0-89.5-36.5T86-212v-536q0-53 36.5-89.5T212-874h276v126H212v536h276v126H212Zm415-146-88-89 96-96H352v-126h283l-96-96 88-89 247 248-247 248Z" /></svg>
                                <span className="flex-1 ms-3 whitespace-nowrap">Sign Up</span>
                            </Link>
                        </li>
                        <li>
                            <button 
                                onClick={logout}
                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group w-full"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" className="dark:fill-gray-300 fill-gray-500"><path d="M180-120q-24 0-42-18t-18-42v-600q0-24 18-42t42-18h291v60H180v600h291v60H180Zm486-185-43-43 102-102H360v-60h363L621-612l43-43 176 176-174 174Z" /></svg>
                                <span className="flex-1 ms-3 whitespace-nowrap">Cerrar Sesión</span>
                            </button>
                        </li>                        
                    </ul>
                    <div id="dropdown-cta" className="p-4 mt-6 rounded-lg bg-blue-50 dark:bg-blue-900"
                        hidden={!msjAviso}
                        role="alert">
                        <div className="flex items-center mb-3">
                            <span className="bg-orange-100 text-orange-800 text-sm font-semibold me-2 px-2.5 py-0.5 rounded-sm dark:bg-orange-200 dark:text-orange-900">Versión Beta</span>
                            <button
                                onClick={() => { setMsjAviso(false) }}
                                type="button"
                                className="ms-auto -mx-1.5 -my-1.5 bg-blue-50 inline-flex justify-center items-center w-6 h-6 text-blue-900 rounded-lg focus:ring-2 focus:ring-blue-400 p-1 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-400 dark:hover:bg-blue-800"
                                data-dismiss-target="#dropdown-cta"
                                aria-label="Close">
                                <svg className="w-2.5 h-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                            </button>
                        </div>
                        <p className="mb-3 text-sm text-blue-800 dark:text-blue-400">
                            Esta aplicación se encuentra en fase beta. Es posible que experimentes errores o comportamientos inesperados. Agradecemos tu comprensión mientras seguimos mejorando.                        </p>
                    </div>
                </div>
            </aside >

        </>
    )
}