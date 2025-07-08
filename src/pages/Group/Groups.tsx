import { useEffect, useState } from "react"
import type { Group } from "../../interfaces/Group"
import { useForm } from "react-hook-form";
import { CreateGroup, GetGroupsOf } from "../../services/GroupService";
import { AsideMenu } from "../../components/asideMenu";

export const Groups = () => {
    const [showModal, setShowModal] = useState(false)
    const [groups, setGroups] = useState<Group[]>([]);

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
        }
        fetchGroups()
    }, [])


    return (
        <div className="bg-gray-100 dark:bg-gray-700">
            <AsideMenu />
            {showModal && (<div
                className="fixed inset-0 z-50 grid place-content-center bg-black/50 p-4"
                role="dialog"
                aria-modal="true"
                aria-labelledby="modalTitle"
            >
                <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg dark:bg-gray-900">
                    <form className="mt-4 flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>

                        <div className="flex items-start justify-between">
                            <h2 id="modalTitle" className="text-xl font-bold text-gray-900 sm:text-2xl dark:text-white">
                                Completa la informacion de tu nuevo grupo.
                            </h2>

                            <button
                                onClick={() => setShowModal(false)}
                                type="button"
                                className="-me-4 -mt-4 rounded-full p-2 text-gray-400 transition-colors hover:bg-gray-50 hover:text-gray-600 focus:outline-none dark:text-gray-500 dark:hover:bg-gray-800 dark:hover:text-gray-300"
                                aria-label="Close"
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
                        </div>

                        <div className="mt-1">
                            <p className="text-pretty text-gray-700 dark:text-gray-200">
                                completa la informacion del nuevo grupo de estudio
                            </p>

                            <label >
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                                    Nombre del grupo
                                </span>
                                <input
                                    type="text"
                                    id="name"
                                    className="mt0.5 w-full h-8 rounded border-1 border-gray-300 shadow-sm sm:text-sm dark:border-gray-600 dark:bg-gray-900 dark:text-white"
                                    {...register("name", { required: "El nombre es obligatorio" })}

                                />
                                {errors.name && (
                                    <p className="text-red-400">{errors.name.message}</p>
                                )}
                            </label>
                            <label >
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                                    Color                                </span>
                                <input
                                    type="color"
                                    defaultValue="#fffff"
                                    className="mt-0.5 w-full h-8 rounded  border-gray-300 shadow-sm sm:text-sm dark:border-gray-600 dark:bg-gray-900 dark:text-white"
                                    {...register("hexColor", { required: "El color es obligatorio" })}

                                />
                                {errors.hexColor && (
                                    <p className="text-red-400">{errors.hexColor.message}</p>
                                )}
                            </label>




                        </div>

                        <footer className="mt-6 flex justify-end gap-2">
                            <button
                                type="button"
                                onClick={() => handleCloseModal()}
                                className="rounded bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
                            >
                                Cancelar
                            </button>

                            <button
                                type="submit"
                                className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                            >
                                Crear
                            </button>
                        </footer>
                    </form>

                </div>
            </div>)
            }
            <main className="ease-soft-in-out lg:ml-68.5 relative min-h-screen   rounded-xl transition-all duration-200 ">
                <div
                    className="relative flex flex-col min-w-0 mb-6 break-words dark:bg-gray-800 dark:text-white bg-white border-0 shadow-soft-xl rounded-2xl bg-clip-border">
                    <div className="p-4 pb-0 mb-0 bg-white dark:bg-gray-800 rounded-t-2xl">
                        <h6 className="mb-1 capitalize text-2xl font-semibold">Tus Grupos</h6>
                        <p className="leading-normal text-sm">Aqui encuentras los grupos de estudios a los que perteneces, o puedes unirte o crear uno nuevo.</p>
                    </div>
                    <div className="flex flex-wrap gap-2 p-4  ">
                        {groups.map((grupo) => (

                            <div className="max-w-xs p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
                                
                                <a href="#">
                                    <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">Need a help in Claim?</h5>
                                </a>
                                <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">Go to this step by step guideline process on how to certify for your weekly benefits:</p>
                                <a href="#" className="inline-flex font-medium items-center text-blue-600 hover:underline">
                                    See our guideline
                                    <svg className="w-3 h-3 ms-2.5 rtl:rotate-[270deg]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778" />
                                    </svg>
                                </a>
                            </div>

                        ))}

                    </div>
                </div>
            </main >
        </div >
    )
}