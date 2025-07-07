export const Groups = () => {
    return (
        <div className="bg-gray-100 dark:bg-gray-700 w-full min-h-screen">
            <div className="h-20"></div>
            <div className="flex-none w-full max-w-full px-3 mt-6">
                <div
                    className="relative flex flex-col min-w-0 mb-6 break-words dark:bg-gray-800 dark:text-white bg-white border-0 shadow-soft-xl rounded-2xl bg-clip-border">
                    <div className="p-4 pb-0 mb-0 bg-white dark:bg-gray-800 rounded-t-2xl">
                        <h6 className="mb-1 capitalize text-2xl">Tus Grupos</h6>
                        <p className="leading-normal text-sm">Aqui encuentras los grupos de estudios a los que perteneces, o puedes unirte o crear uno nuevo.</p>
                    </div>
                    <div className="flex-auto p-4">
                        <div className="flex flex-wrap -mx-3">
                            <div className="w-full max-w-full px-3 mb-6 md:w-6/12 md:flex-none xl:mb-0 xl:w-3/12">
                                <div
                                    className="relative flex flex-col min-w-0 break-words bg-transparent border-0 shadow-none rounded-2xl bg-clip-border">
                                    <div className="relative">
                                        <a className="block shadow-xl rounded-2xl">
                                            <img src="/home-decor-1.jpg" alt="img-blur-shadow"
                                                className="max-w-full shadow-soft-2xl rounded-2xl" />
                                        </a>
                                    </div>
                                    <div className="flex-auto px-1 pt-6">
                                        <p
                                            className="relative z-10 mb-2 leading-normal text-transparent bg-gradient-to-tl from-gray-900 to-slate-800 text-sm bg-clip-text dark:text-white">
                                            Project #2</p>

                                        <p className="mb-6 leading-normal text-sm">As Uber works through a huge amount of internal management
                                            turmoil.</p>
                                        <div className="flex items-center justify-between">
                                            <button type="button"
                                                className="inline-block px-8 py-2 mb-0 font-bold text-center uppercase align-middle transition-all bg-transparent border border-solid rounded-lg shadow-none cursor-pointer leading-pro ease-soft-in text-xs hover:scale-102 active:shadow-soft-xs tracking-tight-soft border-fuchsia-500 text-fuchsia-500 hover:border-fuchsia-500 hover:bg-transparent hover:text-fuchsia-500 hover:opacity-75 hover:shadow-none active:bg-fuchsia-500 active:text-white active:hover:bg-transparent active:hover:text-fuchsia-500">View
                                                Project</button>
                                            <div className="mt-2">
                                                <a
                                                    className="relative z-20 inline-flex items-center justify-center w-6 h-6 text-white transition-all duration-200 border-2 border-white border-solid ease-soft-in-out text-xs rounded-full hover:z-30"
                                                    data-target="tooltip_trigger" data-placement="bottom">
                                                    <img className="w-full rounded-full" alt="Image placeholder" src="/team-1.jpg" />
                                                </a>
                                                <div data-target="tooltip" className="hidden px-2 py-1 text-white bg-black rounded-lg text-sm"
                                                    role="tooltip">
                                                    Elena Morison
                                                    <div
                                                        className="invisible absolute h-2 w-2 bg-inherit before:visible before:absolute before:h-2 before:w-2 before:rotate-45 before:bg-inherit before:content-['']"
                                                        data-popper-arrow></div>
                                                </div>
                                                <a
                                                    className="relative z-20 inline-flex items-center justify-center w-6 h-6 -ml-4 text-white transition-all duration-200 border-2 border-white border-solid ease-soft-in-out text-xs rounded-full hover:z-30"
                                                    data-target="tooltip_trigger" data-placement="bottom">
                                                    <img className="w-full rounded-full" alt="Image placeholder" src="/team-2.jpg" />
                                                </a>
                                                <div data-target="tooltip" className="hidden px-2 py-1 text-white bg-black rounded-lg text-sm"
                                                    role="tooltip">
                                                    Ryan Milly
                                                    <div
                                                        className="invisible absolute h-2 w-2 bg-inherit before:visible before:absolute before:h-2 before:w-2 before:rotate-45 before:bg-inherit before:content-['']"
                                                        data-popper-arrow></div>
                                                </div>
                                                <a
                                                    className="relative z-20 inline-flex items-center justify-center w-6 h-6 -ml-4 text-white transition-all duration-200 border-2 border-white border-solid ease-soft-in-out text-xs rounded-full hover:z-30"
                                                    data-target="tooltip_trigger" data-placement="bottom">
                                                    <img className="w-full rounded-full" alt="Image placeholder" src="/team-3.jpg" />
                                                </a>
                                                <div data-target="tooltip" className="hidden px-2 py-1 text-white bg-black rounded-lg text-sm"
                                                    role="tooltip">
                                                    Nick Daniel
                                                    <div
                                                        className="invisible absolute h-2 w-2 bg-inherit before:visible before:absolute before:h-2 before:w-2 before:rotate-45 before:bg-inherit before:content-['']"
                                                        data-popper-arrow></div>
                                                </div>
                                                <a
                                                    className="relative z-20 inline-flex items-center justify-center w-6 h-6 -ml-4 text-white transition-all duration-200 border-2 border-white border-solid ease-soft-in-out text-xs rounded-full hover:z-30"
                                                    data-target="tooltip_trigger" data-placement="bottom">
                                                    <img className="w-full rounded-full" alt="Image placeholder" src="/team-4.jpg" />
                                                </a>
                                                <div data-target="tooltip" className="hidden px-2 py-1 text-white bg-black rounded-lg text-sm"
                                                    role="tooltip">
                                                    Peterson
                                                    <div
                                                        className="invisible absolute h-2 w-2 bg-inherit before:visible before:absolute before:h-2 before:w-2 before:rotate-45 before:bg-inherit before:content-['']"
                                                        data-popper-arrow></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="w-full max-w-full px-3 mb-6 md:w-6/12 md:flex-none xl:mb-0 xl:w-3/12">
                                <div
                                    className="relative flex flex-col h-full min-w-0 break-words bg-transparent border border-solid shadow-none rounded-2xl border-slate-100 bg-clip-border dark:border-gray-600 hover:scale-99 transition-all cursor-pointer"
                                    onClick={() => alert("funcion para abrir modal y crear nuebo grupo")}
                                >
                                    <div className="flex flex-col justify-center flex-auto p-6 text-center">
                                        <a >
                                            <i className="mb-4 fa fa-plus text-slate-400"></i>
                                            <h5 className="text-slate-400 flex justify-center items-center">
                                                <svg className="mr-2 dark:fill-slate-400" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" ><path d="M440-280h80v-160h160v-80H520v-160h-80v160H280v80h160v160Zm40 200q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" /></svg>
                                                Crear nuevo grupo
                                            </h5>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}