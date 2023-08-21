import { CreateTodo } from "@/components/CreateTodo";
import { TodoItem, TodoItemProps } from "@/components/TodoItem";
import { fetchInstance } from "@/config/fetch";
import { routes } from "@/config/routes";
import { redirect } from "next/navigation";

const getTodos = async () => {
    try {
        const response = await fetchInstance("/todos");
        return response;
    } catch (err) {
        redirect(routes.auth.login)
    }
};

const TodosPage = async () => {
    const todos = await getTodos();

    return (
        <div className="bg-[#e3e9ff] w-screen h-screen">
            <div className="absolute min-w-[30%] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex gap-4 flex-col">
                <div className="bg-primary text-center p-4 rounded">
                    <h1 className="text-3xl text-white font-medium">Todos</h1>
                </div>
                <CreateTodo />
                <div className="bg-white rounded p-10 flex flex-col gap-4">
                    {todos.length > 0 ? (
                        todos.map((todo: TodoItemProps) => <TodoItem key={todo.id} {...todo} />)
                    ) : (
                        <p className="text-center">No todos</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TodosPage;
