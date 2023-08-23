"use client";
import { Button } from "@/components/Button";
import { Input, InputDesign } from "@/components/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import { AtSign, Lock, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";
import { axiosInstance } from "../../../axios";

const schema = yup.object({
    name: yup.string().required("Esse campo é obrigatório."),
    email: yup.string().email("Esse campo deve ser um email").required("Esse campo é obrigatório."),
    password: yup.string().required("Esse campo é obrigatório."),
});

const SignupForm: React.FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<any>({
        resolver: yupResolver(schema),
    });

    const router = useRouter();

    const onSubmit = async (data: any) => {
        try {
            await axiosInstance.post("/auth/signup", data);

            toast.success("Signup realizado com sucesso.");
            router.replace("/auth/login");
        } catch (err: any) {
            toast.error(err.response.data.message);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
             <Input
                name="name"
                register={register}
                label="Nome"
                Icon={User}
                errors={errors}
                placeholder="John Doe"
                inputDesign={InputDesign.LOGIN}
            />
            <Input
                name="email"
                register={register}
                label="Email"
                Icon={AtSign}
                errors={errors}
                placeholder="john@gmail.com"
                inputDesign={InputDesign.LOGIN}
            />
            <Input
                name="password"
                register={register}
                label="Senha"
                Icon={Lock}
                errors={errors}
                placeholder="8+ caracteres obrigatórios"
                type="password"
                inputDesign={InputDesign.LOGIN}
            />
            <Button>CRIAR CONTA</Button>
            <Link href={"/auth/login"} className="text-center text-primary hover:scale-105 transition-all">Login</Link>

        </form>
    );
};

export default SignupForm;
