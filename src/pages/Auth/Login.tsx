import { useState } from "react";
import type { LoginInterface } from "../../interfaces/Auth";
import { login } from "../../services/authService";
import { useNavigate } from "react-router-dom";

interface respondeDTO {
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
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!email || !password) {
            setError("Asegúrate de que hayas ingresado todos los campos.");
            setTimeout(() => setError(""), 3000);
            return;
        }

        const loginData: LoginInterface = { email, password };

        try {
            const response: respondeDTO = await login(loginData);
            console.log(typeof (response));
            if (response) {
                localStorage.setItem("token", response.token)
                localStorage.setItem("user", JSON.stringify(response.user))
                window.location.href = "/";
            }

        } catch (error: any) {
            setError(error.message);
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
                    <div className="mt-5">
                        <form className="pb-2" >
                            <input type="hidden" name="provider" value="google" /><button
                                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-zinc-800 bg-none hover:bg-accent hover:text-accent-foreground h-10 px-4 w-full text-black dark:text-white py-6"
                                type="submit"
                            >
                                <span className="mr-2"
                                ><svg
                                    stroke="currentColor"
                                    fill="currentColor"
                                    stroke-width="0"
                                    version="1.1"
                                    x="0px"
                                    y="0px"
                                    viewBox="0 0 48 48"
                                    enable-background="new 0 0 48 48"
                                    className="h-5 w-5"
                                    height="1em"
                                    width="1em"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                        <path
                                            fill="#FFC107"
                                            d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12
c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24
c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                                        ></path>
                                        <path
                                            fill="#FF3D00"
                                            d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657
C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                                        ></path>
                                        <path
                                            fill="#4CAF50"
                                            d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36
c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                                        ></path>
                                        <path
                                            fill="#1976D2"
                                            d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571
c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                                        ></path></svg></span >
                                <span>Google</span>
                            </button>
                        </form>
                    </div>
                    <div className="relative my-3">
                        <div className="relative flex items-center py-1">
                            <div className="grow border-t border-zinc-800"></div>
                            <div className="grow border-t border-zinc-800"></div>
                        </div>
                    </div>
                    <div>
                        <form className="mb-4" onSubmit={handleLogin}>
                            <div className="grid gap-2">
                                <div className="grid gap-1">
                                    <label className="text-white" >Email</label>
                                    <input
                                        className="mr-2.5 mb-2 h-full min-h-[44px] w-full rounded-lg border dark:bg-transparent text-dark  border-zinc-800 px-4 py-3 text-sm font-medium placeholder:text-zinc-400 focus:outline-0 dark:border-zinc-800 dark:bg-blask dark:text-white dark:placeholder:text-zinc-400"
                                        id="email"
                                        placeholder="name@example.com"
                                        type="email"
                                        value={email}
                                        onChange={(e) => { setEmail(e.target.value) }}
                                        required
                                    /><label
                                        className="text-zinc-950 mt-2 dark:text-white"
                                    >Password</label>
                                    <input
                                        id="password"
                                        placeholder="Password"
                                        type="password"
                                        className="mr-2.5 mb-2 h-full min-h-[44px] w-full rounded-lg border dark:bg-transparent text-dark  border-zinc-800 px-4 py-3 text-sm font-medium placeholder:text-zinc-400 focus:outline-0 dark:border-zinc-800 dark:bg-blask dark:text-white dark:placeholder:text-zinc-400"
                                        value={password}
                                        onChange={(e) => { setPassword(e.target.value) }}
                                        required

                                    />
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

                                >
                                    Iniciar sesion
                                </button>

                            </div>

                        </form>


                        <p>
                            <a
                                onClick={() => { navigate("/auth/register") }}
                                className=" text-black text-sm dark:text-white"
                            >Aun no tienes una cuenta?  <span className="font-medium hover:underline">Registrate</span></a>
                        </p>
                    </div>
                </div>
            </div >
            {error.length > 0 && (
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