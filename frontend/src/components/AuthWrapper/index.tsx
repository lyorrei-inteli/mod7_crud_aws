import LoginForm from "@/components/LoginForm";
import Head from "next/head";
import Image from "next/image";
import HomeImage from "@/assets/login.jpg";

interface AuthWrapperProps {
    children: React.ReactNode;
}

export const AuthWrapper: React.FC<AuthWrapperProps> = ({ children }) => {
    return (
        <>
            <div className="min-h-[100vh] flex">
                <div className="grow w-[50vw] flex items-center">
                    <div className="my-auto px-28 rounded-lg w-full">
                        <h1 className="text-4xl mb-2 text-[#0D0958]">Olá, bem-vindo de volta!</h1>
                        <h3 className="text-xl text-[#7A7C95] mb-4">É um prazer ter você aqui.</h3>
                        {children}
                    </div>
                </div>
                <div className="w-[50vw] relative">
                    <div className="w-[90%] h-[90%] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]  bg-orange-500 overflow-hidden rounded-3xl">
                        <div className="absolute top-36 left-[50%] w-[60%] translate-x-[-50%] rounded-tl-4xl">
                            <h1 className="text-white font-bold text-4xl">
                                Sua lista de tarefas centralizada em um só lugar
                            </h1>
                            <h5 className="text-white mt-4 text-xl">
                                Faça login com suas credenciais para acessar seus afazeres.
                            </h5>
                        </div>
                        <Image src={HomeImage} alt="Home" className="object-cover w-full h-full" />
                    </div>
                </div>
            </div>
        </>
    );
};
