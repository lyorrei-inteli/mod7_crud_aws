"use client";
import { fetchInstance } from "@/config/fetch";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Button } from "../Button";
import { Input } from "../Input";
import { useRouter } from "next/navigation";

export const CreateTodo = () => {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        try {
            if (!data.title) return toast.error("Title is required");
            await fetchInstance("/todos/create", {
                method: "POST",
                body: JSON.stringify(data),
            });

            toast.success("Todo created");
            router.refresh();
            reset();
        } catch (error) {
            toast.error("Error creating todo");
        }
    };

    return (
        <form className="flex gap-4" onSubmit={handleSubmit(onSubmit)}>
            <Input className="grow" placeholder="Title" register={register} name="title" />
            <Button type="submit">Create</Button>
        </form>
    );
};
