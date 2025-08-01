import { useState } from "react";
import type { LoginInterface } from "../../interfaces/Auth";
import { login } from "../../services/authService";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ClipLoader } from "react-spinners";
interface responseDTO {
    user: {
        id: number,
        email: string,
        name: string,
        avatarUrl: string,
        birthdate: string
    },
    token: string

}

export const Login = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState<Boolean>(false)
    const [error, setError] = useState<string>();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginInterface>();

    const onSubmit = async (data: LoginInterface) => {
        setLoading(true)
        try {
            const response: responseDTO = await login(data);
            console.log(typeof (response));
            if (response) {
                localStorage.setItem("token", response.token)
                localStorage.setItem("user", JSON.stringify(response.user))
                window.location.href = "/";
            }
            setLoading(false)
        } catch (error: any) {
            setError(error.message || "Error desconocido");
            setLoading(false)
            setTimeout(() => setError(""), 3000);
        }
    };


    return (
        <div
            className="flex flex-col justify-center items-center bg-white dark:bg-gray-900 h-max min-h-[100vh] "
        >
            <div
                className="mx-auto flex w-full flex-col justify-center px-5 pt-0 md:max-w-[50%]  min-h-[100vh] lg:max-w-[50%] lg:px-6 pb-10"
            >
                <a className="mt-10 w-fit text-black dark:text-white" href="/">
                    <div className="flex w-fit items-center lg:pl-0 lg:pt-0 xl:pt-0">
                        <svg
                            stroke="currentColor"
                            fill="currentColor"
                            stroke-width="0"
                            viewBox="0 0 320 512"
                            className="mr-3 h-[13px] w-[8px] text-black dark:text-white"
                            height="1em"
                            width="1em"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"
                            ></path>
                        </svg>
                        <p className="ml-0 text-sm text-black dark:text-white">Volver atras</p>
                    </div>
                </a>
                <div
                    className="my-auto mb-auto mt-5 flex flex-col md:mt-[70px] w-[350px] max-w-[450px] mx-auto md:max-w-[450px] lg:mt-[50px] lg:max-w-[450px]"
                >
                    <p className="text-[32px] font-bold text-black dark:text-white">Sign In</p>
                    <p className="mb-2.5 mt-2.5 font-normal dark:text-zinc-400 text-black">
                        Enter your email and password to sign in!
                    </p>
                    <div className="relative my-3">
                        <div className="relative flex items-center py-1">
                            <div className="grow border-t border-zinc-800"></div>
                            <div className="grow border-t border-zinc-800"></div>
                        </div>
                    </div>
                    <div>
                        <form className="mb-4" onSubmit={handleSubmit(onSubmit)}>
                            <div className="grid gap-2">
                                <div className="grid gap-1">
                                    <label className="text-white" >Email</label>
                                    <input
                                        className="mr-2.5 mb-2 h-full min-h-[44px] w-full rounded-lg border dark:bg-transparent text-dark  border-zinc-800 px-4 py-3 text-sm font-medium placeholder:text-zinc-400 focus:outline-0 dark:border-zinc-800 dark:bg-blask dark:text-white dark:placeholder:text-zinc-400"
                                        placeholder="name@example.com"
                                        type="email"
                                        {...register("email", { required: "El email es obligatorio" })}

                                    />
                                    {errors.email && <p className="text-red-400">{errors.email.message}</p>}

                                    <label
                                        className="text-zinc-950 mt-2 dark:text-white"
                                    >Password</label>
                                    <input
                                        placeholder="Password"
                                        type="password"
                                        className="mr-2.5 mb-2 h-full min-h-[44px] w-full rounded-lg border dark:bg-transparent text-dark  border-zinc-800 px-4 py-3 text-sm font-medium placeholder:text-zinc-400 focus:outline-0 dark:border-zinc-800 dark:bg-blask dark:text-white dark:placeholder:text-zinc-400"
                                        {...register("password", { required: "La contraseña es obligatoria" })}


                                    />

                                    {errors.password && (
                                        <p className="text-red-400">{errors.password.message}</p>
                                    )}


                                </div>
                                <button
                                    className="whitespace-nowrap ring-offset-background transition-colors 
                                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
                                    focus-visible:ring-offset-2  disabled:opacity-50 
                                    bg-zinc-950 text-white hover:bg-blue-950
                                    dark:bg-white dark:text-black 
                                    dark:hover:bg-white/80 dark:hover:text-gray-900 dark:active:bg-white border-1 border-zinc-800 flex w-full max-w-full mt-6 items-center
                                    justify-center rounded-lg px-4 py-4 text-base font-medium cursor-pointer"
                                    type="submit"
                                    disabled={loading ? true : false}

                                >
                                    {!loading ? "Iniciar sesion" : <>
                                        <ClipLoader size={18} />
                                        <p className="ml-1">Cargando...</p>
                                    </>}

                                </button>

                            </div>

                        </form>


                        <p>
                            <a
                                onClick={() => { navigate("/auth/register") }}
                                className=" text-black text-sm dark:text-white"
                            >Aun no tienes una cuenta?  <span className="font-medium hover:underline cursor-pointer">Registrate</span></a>
                        </p>
                    </div>
                </div>
            </div >
            {error && (
                <div role="alert" className="fixed bottom-5 left-5 border-s-4 border-red-700 bg-red-50 dark:bg-white/80 p-4">
                    <div className="flex items-center gap-2 text-red-700">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
                            <path
                                fillRule="evenodd"
                                d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
                                clipRule="evenodd"
                            />
                        </svg>

                        <strong className="font-medium"> Hubo un error </strong>
                    </div>

                    <p className="mt-2 text-sm text-red-700">
                        {error}
                    </p>
                </div>

            )}
        </div >
    )
}