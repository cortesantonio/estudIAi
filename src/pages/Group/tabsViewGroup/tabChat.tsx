import type { Group } from "../../../interfaces/Group";

interface ChatProps {
    isOpen: boolean;
    group: Partial<Group>;
}

export const Chat = ({ isOpen, group }: ChatProps) => {

    if (!isOpen) return null;
    if (!group) return null;

    return (<div className="border rounded-lg overflow-hidden m-4 shadow-lg">
        <div className="sticky top-0 z-50  border-b  border-gray-300 bg-white py-5 px-8 text-left text-sm  text-gray-800">
            <h4 className=" inline-block py-1 text-left font-sans font-semibold normal-case">Chat grupal de {group.name}</h4>
        </div>
        <div className="flex-grow px-8 pt-8 text-left text-gray-700">
            <div className="relative mb-6 text-center">
                <span className="relative px-2 text-sm text-gray-600 dark:text-gray-400">28 June, 2022</span>
            </div>

            <div className="relative mb-6 text-left">
                <div className="text-gray-700">
                    <div className="absolute inset-x-0 top-0">
                        <img src="/marie.jpg" alt="" className="float-right inline-block h-6 w-6 sm:h-12 sm:w-12 rounded-full" />
                    </div>
                    <div className="relative float-right mr-8 sm:mr-16 inline-block rounded-md bg-blue-700 py-3 px-4 text-white">
                        <p className="text-sm">Hi, John</p>
                    </div>
                </div>
                <div className="clear-both flex text-gray-700"></div>
            </div>

            <div className="relative mb-6 text-left">
                <div className="text-gray-700">
                    <div className="absolute inset-x-0 top-0">
                        <img src="/marie.jpg" alt="" className="float-right inline-block h-6 w-6 sm:h-12 sm:w-12 rounded-full" />
                    </div>
                    <div className="relative float-right mr-8 sm:mr-16 inline-block rounded-md bg-blue-700 py-3 px-4 text-white">
                        <p className="text-sm">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquid, dicta.</p>
                    </div>
                </div>
                <div className="clear-both flex text-gray-700"></div>
            </div>

            <div className="relative mb-6 text-center">
                <span className="relative  text-gray-600 dark:text-gray-400">Yesterday</span>
            </div>

            <div className="relative mb-6 text-left">
                <div className="text-gray-700">
                    <div className="absolute inset-x-0 top-0">
                        <img src="/marie.jpg" alt="" className="float-right inline-block h-6 w-6 sm:h-12 sm:w-12 rounded-full" />
                    </div>
                    <div className="relative float-right mr-8 sm:mr-16 inline-block rounded-md bg-blue-700 py-3 px-4 text-white">
                        <p className="text-sm">Option congue nihil imperdiet mazim placerat facer possim.</p>
                    </div>
                </div>
                <div className="clear-both flex text-gray-700"></div>
            </div>

            <div className="relative mb-6 text-left">
                <div className="text-gray-700">
                    <div className="absolute top-0 left-0">
                        <img src="/images/y9s3xOJV6rnQPKIrdPYJy.png" alt="" className="float-right inline-block h-6 w-6 sm:h-12 sm:w-12 rounded-full" />
                    </div>
                    <div className="relative float-left ml-8 sm:ml-16 inline-block rounded-md bg-gray-200 py-3 px-4">
                        <p className="text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Non quia optio accusamus.</p>
                    </div>
                </div>
                <div className="clear-both flex text-gray-700"></div>
            </div>

            <div className="relative mb-6 text-left">
                <div className="text-gray-700">
                    <div className="absolute inset-x-0 top-0">
                        <img src="/marie.jpg" alt="" className="float-right inline-block h-6 w-6 sm:h-12 sm:w-12 rounded-full" />
                    </div>
                    <div className="relative float-right mr-8 sm:mr-16 inline-block rounded-md bg-blue-700 py-3 px-4 text-white">
                        <p className="text-sm">Lorem ipsum dolor sit amet, consectetuer adipiscing elit</p>
                    </div>
                </div>
                <div className="clear-both flex text-gray-700"></div>
            </div>

            <div className="relative mb-6 text-left">
                <div className="clear-both flex text-gray-700"></div>
            </div>
            <div className="mt-4  flex items-start border-t  border-gray-300 sm:p-8 py-4 text-left  text-gray-700">
                <textarea placeholder="Your Message" className="mr-4 overflow-hidden w-full flex-1 cursor-text resize-none whitespace-pre-wrap rounded-md bg-white text-sm py-2 sm:py-0 font-normal text-gray-600 opacity-70 shadow-none outline-none focus:text-gray-600 focus:opacity-100"></textarea>
                <button className="relative  inline-flex h-10 w-auto flex-initial cursor-pointer items-center justify-center self-center  rounded-md bg-blue-700 px-6 text-center align-middle text-sm font-medium text-white outline-none focus:ring-2">Send</button>
            </div>
        </div>

    </div>
    )
}