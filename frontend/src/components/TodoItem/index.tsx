'use client'
import React from "react";
import { toast } from "react-toastify";
import { axiosInstance } from "../../../axios";

export interface TodoItemProps {
    id: string;
    title: string;
    completed: boolean
}

export const TodoItem = ({ id, title, completed }: TodoItemProps) => {
    const [completedState, setCompletedState] = React.useState(completed);
    const [loading, setLoading] = React.useState(false);

    const handleCheckboxChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoading(true)
        try {
            setCompletedState(e.target.checked);
            await axiosInstance.patch(`/todos/${id}`, {
                completed: e.target.checked
            });
            toast.success("Todo atualizado com sucesso");
        } catch (error) {
            toast.error("Erro ao atualizar o todo");
        }

    };

    return (
        <div className="flex items-center gap-4">
            <input type="checkbox" onChange={handleCheckboxChange} className="mr-2" defaultChecked={completedState} />
            <p className={`text-xl ${completedState && 'line-through'}`}>{title}</p>
        </div>
    );
};
