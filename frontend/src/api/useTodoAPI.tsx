import axios, { AxiosResponse, AxiosError } from "axios";
import { useState, useEffect } from "react";
import { UseFormReset } from "react-hook-form";

type TodoTypes = {
  id: string;
  todo: string;
};

type GetTodoTypes = {
  todos: TodoTypes[];
};

export default function useTodoAPI(reset: UseFormReset<AddTodoType>) {
  const [todos, setTodos] = useState<TodoTypes[]>([]);
  const [isEdit, setIsEdit] = useState({ id: "", todo: "" });

  const addTodo = async (event: AddTodoType) => {
    const { todo } = event;
    console.log(todo);
    await axios
      .post("http://localhost:3000/add", {
        data: {
          todo,
        },
      })
      .then((response: AxiosResponse<TodoTypes>) => {
        console.log(response.data);
        const todo = response.data;
        setTodos((preTodos) => [todo, ...preTodos]);
      })
      .catch((error: AxiosError) => {
        console.log(error);
      });
  };

  const deleteTodo = async (id: string) => {
    console.log(id);

    await axios
      .delete("http://localhost:3000/delete", {
        data: {
          id,
        },
      })
      .then(() => {
        const newTodos = todos.filter((todo) => todo.id !== id);
        setTodos(newTodos);
      })
      .catch((e: AxiosError) => {
        console.log(e.message);
        setTodos(todos);
      });
  };

  const selectEditTodo = (todo: TodoTypes) => {
    setIsEdit({ id: todo.id, todo: todo.todo });
  };

  const editTodo = async ({ editTodoName }: AddTodoType) => {
    await axios
      .put("http://localhost:3000/update", {
        data: {
          id: isEdit.id,
          todo: editTodoName,
        },
      })
      .then((response: AxiosResponse<TodoTypes>) => {
        console.log(response.data);
        const newTodos = todos.map((todo) => {
          return todo.id === response.data.id ? response.data : todo;
        });
        setIsEdit({ id: "", todo: "" });
        setTodos(newTodos);
        reset();
      })
      .catch((e: AxiosError) => {
        console.log(e.message);
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:3000")
      .then((response: AxiosResponse<GetTodoTypes>) => {
        console.log(response.data.todos);
        const { todos } = response.data;
        setTodos(todos);
      });
  }, []);

  return {
    todos,
    isEdit,
    selectEditTodo,
    addTodo,
    deleteTodo,
    editTodo,
  };
}
