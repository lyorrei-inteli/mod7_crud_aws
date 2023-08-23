"use client";
import { Button } from "@/components/Button";
import { Input, InputDesign } from "@/components/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import { AtSign, Lock } from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";

const schema = yup.object({
    email: yup.string().email("Esse campo deve ser um email").required("Esse campo é obrigatório."),
    password: yup.string().required("Esse campo é obrigatório."),
});

const LoginForm: React.FC = () => {
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
            const res = await signIn("credentials", {
                redirect: false,
                email: data.email,
                password: data.password,
            });

            if (res?.error) {
                throw new Error(res.error);
            }

            toast.success("Login realizado com sucesso.");
            router.replace("/protected/todos");
        } catch (err: any) {
            toast.error(err.message);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
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
            <Button>LOGIN</Button>
            <Link href={"/auth/signup"} className="text-center text-primary hover:scale-105 transition-all">Criar conta</Link>
        </form>
    );
};

export default LoginForm;
