import { useEffect, useState, useRef } from "react"
import type { Group } from "../../interfaces/Group"
import { useForm } from "react-hook-form";
import { CreateGroup, GetGroupsOf } from "../../services/groupService";
import { AsideMenu } from "../../components/asideMenu";
import { useNavigate } from "react-router-dom";
export const Groups = () => {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false)
    const [groups, setGroups] = useState<Group[]>([]);
    const [openDropdown, setOpenDropdown] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);
    const dropdownRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                openDropdown !== null &&
                dropdownRefs.current[openDropdown] &&
                !dropdownRefs.current[openDropdown]?.contains(event.target as Node)
            ) {
                setOpenDropdown(null);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [openDropdown]);

    const handleCloseModal = () => {
        setShowModal(!showModal)
        reset();
    }
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<Group>();

    const onSubmit = async (data: Group) => {
        try {
            const responde = await CreateGroup(data)
            console.log(responde);
        } catch (error) {
            console.log(error);

        }
        handleCloseModal();
        window.location.reload();

    };
    useEffect(() => {
        async function fetchGroups() {
            try {
                const response = await GetGroupsOf();
                setGroups(response);
            } catch (error) {
                console.error('Error al obtener los grupos:', error);
            }
            setLoading(false);
        }
        fetchGroups()
    }, [])

    const SkeletonCard = () => (
        <div className="w-full max-w-xs lg:max-w-[300px] bg-white dark:bg-gray-800 rounded-lg shadow-md flex flex-col sm:flex-row overflow-hidden border border-gray-200 dark:border-gray-700 animate-pulse">
            <div className="h-3 w-full sm:w-3 sm:h-auto flex-none bg-gray-200 dark:bg-gray-700" />
            <div className="flex-1 p-4 flex flex-col justify-between">
                <div className="mb-4">
                    <div className="flex items-center justify-between gap-2 mb-1">
                        <div className="inline-flex gap-2">
                            <span className="inline-block w-12 h-4 rounded bg-gray-200 dark:bg-gray-700" />
                            <span className="inline-block w-12 h-4 rounded bg-gray-200 dark:bg-gray-700" />
                        </div>
                        <span className="inline-block w-16 h-6 rounded bg-gray-200 dark:bg-gray-700" />
                    </div>
                    <div className="w-3/4 h-5 rounded bg-gray-200 dark:bg-gray-700 mt-2" />
                </div>
                <div className="flex items-center gap-3 mb-3">
                    <span className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700" />
                    <span className="w-1/3 h-4 rounded bg-gray-200 dark:bg-gray-700" />
                </div>
                <div className="flex items-center gap-3 mt-auto">
                    <span className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 border-2 border-white dark:border-gray-700" />
                    <div className="flex flex-col gap-1">
                        <span className="w-20 h-4 rounded bg-gray-200 dark:bg-gray-700" />
                        <span className="w-16 h-3 rounded bg-gray-200 dark:bg-gray-700" />
                    </div>
                    <span className="ml-auto w-8 h-6 rounded-full bg-gray-200 dark:bg-gray-700" />
                </div>
            </div>
        </div>
    );

    return (
        <div className="bg-gray-100 dark:bg-gray-700">
            <AsideMenu />
            {showModal && (<div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
                role="dialog"
                aria-modal="true"
                aria-labelledby="modalTitle"
            >
                <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl dark:bg-gray-900 relative animate-fade-in">
                    <button
                        onClick={() => setShowModal(false)}
                        type="button"
                        className="absolute top-3 right-3 rounded-full p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 focus:outline-none dark:text-gray-500 dark:hover:bg-gray-800 dark:hover:text-gray-300"
                        aria-label="Cerrar"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="size-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                    <form className="mt-2 flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
                        <h2 id="modalTitle" className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                            Nuevo grupo de estudio
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">
                            Completa la información para crear tu grupo.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <div className="flex flex-col items-start">
                                <label className="mb-1 text-sm font-medium text-gray-700 dark:text-gray-200">
                                    Color
                                </label>
                                <input
                                    type="color"
                                    defaultValue="#ffffff"
                                    className="w-10 h-10 p-0 border-2 border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600 transition-all"
                                    {...register("hexColor", { required: "El color es obligatorio" })}
                                />
                                {errors.hexColor && (
                                    <p className="text-red-400 text-xs mt-1">{errors.hexColor.message}</p>
                                )}
                            </div>
                            <div className="flex-1">
                                <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-200">
                                    Nombre del grupo
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    className="w-full h-10 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white px-3 shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 dark:focus:ring-blue-600 dark:focus:border-blue-600 transition-all"
                                    {...register("name", { required: "El nombre es obligatorio" })}
                                    placeholder="Ej: Matemáticas Avanzadas"
                                />
                                {errors.name && (
                                    <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>
                                )}
                            </div>

                        </div>
                        <footer className="mt-4 flex justify-end gap-2">
                            <button
                                type="button"
                                onClick={() => handleCloseModal()}
                                className="rounded-lg bg-gray-100 px-5 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600"
                            >
                                Crear
                            </button>
                        </footer>
                    </form>
                </div>
            </div>)}
            <main className="  ease-soft-in-out lg:ml-68.5 relative min-h-screen   rounded-xl transition-all duration-200 pt-8 ">
                <div className="px-4 pr-8">
                    <div className=" mb-5 rounded-t-2xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-200 dark:border-gray-700 transition-all">
                        <div className="flex-1">
                            <h6 className="mb-1 capitalize text-2xl font-bold text-gray-900 dark:text-white">Tus grupos de estudio</h6>
                            <p className="leading-normal text-sm text-gray-600 dark:text-gray-300">Aquí puedes ver los grupos de estudio a los que perteneces, unirte a uno existente o crear uno nuevo para compartir conocimientos.</p>
                        </div>
                        <div className="flex-shrink-0 flex justify-center items-center">
                            <button
                                className="flex items-center gap-2 px-5 py-2 rounded-lg bg-blue-600 text-white font-semibold shadow-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                                onClick={() => setShowModal(true)}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" height="28" viewBox="0 -960 960 960" width="28" className="fill-white"><path d="M510-501q38-40 56.5-89.5t18.5-101q0-51.5-20.5-102.5T508-881q76 16 116.5 71.5T665-691q0 67-41.5 121.5T510-501Zm235 392v-150q0-50-15-87.5T683-415q70 13 114 53.5T841-259v150h-96Zm93-356v-83h-83v-80h83v-83h80v83h83v80h-83v83h-80Zm-526-32q-81 0-137.5-56.5T118-691q0-81 56.5-137T312-884q81 0 137 56t56 137q0 81-56 137.5T312-497ZM-42-109v-148q0-43.34 22-79.67T40-392q66-32 134.5-48.5T312-457q72 0 140 16t131 48q38 19 60 55t22 80.95V-109H-42Zm353.96-514q28.04 0 47.54-19.96 19.5-19.97 19.5-48 0-28.04-19.68-47.54T312-758q-28.05 0-48.02 19.68Q244-718.64 244-691q0 28.05 19.96 48.03 19.97 19.97 48 19.97ZM84-235h455v-17q0-10.03-5.5-18.24-5.5-8.2-14.5-12.76-48-24-100-36t-106.74-12q-54.74 0-108.5 12.5T104-283q-9 4.56-14.5 12.76Q84-262.03 84-252v17Zm228-456Zm0 456Z" /></svg>
                                <span>Crear grupo</span>
                            </button>
                        </div>
                    </div>

                </div>

                <div className="relative flex flex-col min-w-0 mb-6 break-words dark:bg-gray-800 dark:text-white bg-white border-0 shadow-soft-xl rounded-2xl bg-clip-border lg:mr-8" >

                    <div className="p-4 flex flex-col gap-2 items-start">
                        <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">Filtrar por tipo de grupo</h3>
                        <div className="flex gap-2 w-full">
                            <button type="button" className="px-4 py-2 rounded-full border border-gray-300 dark:border-gray-600 text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600 bg-blue-600 text-white shadow hover:bg-blue-700" /* Aquí puedes manejar el estado de selección */>
                                Todos los grupos
                            </button>
                            <button type="button" className="px-4 py-2 rounded-full border border-gray-300 dark:border-gray-600 text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800">
                                Mis grupos
                            </button>
                            <button type="button" className="px-4 py-2 rounded-full border border-gray-300 dark:border-gray-600 text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800">
                                Grupos como invitado
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-5 flex-row px-4 pb-10 justify-center xs:justify-start ">
                        {loading && Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
                        {!loading && groups.map((grupo, idx) => (
                            <div className="w-full max-w-xs lg:max-w-[300px] bg-white dark:bg-gray-800 rounded-lg shadow-md flex flex-col sm:flex-row overflow-hidden transition-all border border-gray-200 dark:border-gray-700 duration-200" key={grupo.id}>
                                {/* Color lateral */}
                                <div className="h-3 w-full sm:w-3 sm:h-auto flex-none" style={{ backgroundColor: grupo.hexColor }} />
                                {/* Contenido principal */}
                                <div className="flex-1 p-4 flex flex-col justify-between">
                                    <div className="mb-4">
                                        <div className="flex items-center justify-between gap-2 mb-1">
                                            <div className="inline-flex gap-2">
                                                <span className="inline-block px-2 py-0.5 text-xs rounded bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 font-semibold">ID #{grupo.id}</span>
                                                <span className="inline-block px-2 py-0.5 text-xs rounded bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 font-semibold">{grupo.inviteCode}</span>
                                            </div>
                                            <div ref={el => { dropdownRefs.current[idx] = el; }} className="relative inline-flex items-center">
                                                <span className="inline-flex divide-x divide-gray-300 overflow-hidden rounded border border-gray-300 bg-white shadow-sm dark:divide-gray-600 dark:border-gray-600 dark:bg-gray-800">
                                                    <button
                                                        onClick={() => { navigate(`/group/${grupo.id}`) }}
                                                        type="button"
                                                        className="px-3 py-0.5 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-900 focus:relative dark:text-gray-200 dark:hover:bg-gray-700 dark:hover:text-white"
                                                    // Aquí puedes poner una acción principal
                                                    >
                                                        Ir al grupo
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="px-3 py-0.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-900 focus:relative dark:text-gray-200 dark:hover:bg-gray-700 dark:hover:text-white"
                                                        aria-label="Menu"
                                                        onClick={() => setOpenDropdown(openDropdown === idx ? null : idx)}
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            strokeWidth="1.5"
                                                            stroke="currentColor"
                                                            className="size-4"
                                                        >
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                                        </svg>
                                                    </button>
                                                </span>
                                                {openDropdown === idx && (
                                                    <div
                                                        role="menu"
                                                        className="absolute right-0 top-8 z-10 w-44 overflow-hidden rounded border border-gray-300 bg-white shadow-lg dark:border-gray-600 dark:bg-gray-800 animate-fade-in"
                                                    >

                                                        <button
                                                            className="block w-full px-4 py-2 text-left text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-200 dark:hover:bg-gray-700 dark:hover:text-white"
                                                            onClick={() => { /* Otra acción */ setOpenDropdown(null); }}
                                                        >
                                                            Editar grupo
                                                        </button>
                                                        <button
                                                            className="block w-full px-4 py-2 text-left text-sm font-medium text-red-700 transition-colors hover:bg-red-50 dark:text-red-600 dark:hover:bg-red-700/20"
                                                            onClick={() => { /* Eliminar grupo */ setOpenDropdown(null); }}
                                                        >
                                                            Eliminar grupo
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <h2 className="text-lg font-bold text-gray-900 dark:text-white truncate" title={grupo.name}>{grupo.name}</h2>
                                    </div>
                                    <div className="flex items-center gap-3 mb-3">
                                        <button className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg p-2 inline-flex items-center justify-center transition-colors"
                                            onClick={() => { navigator.clipboard.writeText(`El codigo de invitación para el grupo \"${grupo.name}\" es ${grupo.inviteCode}`) }}
                                            title="Copiar código de invitación"
                                        >
                                            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                                                <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z" />
                                            </svg>
                                        </button>
                                        <span className="text-xs text-gray-500 dark:text-gray-400">Código: {grupo.inviteCode}</span>
                                    </div>
                                    <div className="flex items-center gap-3 mt-auto">
                                        <img className="w-10 h-10 rounded-full border-2 border-white dark:border-gray-700 shadow" src={grupo.admin?.avatarUrl || "/marie.jpg"} alt="Avatar del administrador" />
                                        <div>
                                            <p className="text-sm font-semibold text-gray-900 dark:text-white leading-tight">{grupo.admin?.name}</p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">Administrador de grupo</p>
                                        </div>
                                        <span className="ml-auto bg-zinc-800 text-white text-xs rounded-full px-2 py-1 flex items-center justify-center border-2 border-white dark:border-gray-700">+4</span>

                                    </div>
                                </div>

                            </div>
                        ))}
                    </div>
                </div>
            </main >
        </div >
    )
}