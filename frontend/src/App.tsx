import "./App.css";

import { useForm } from "react-hook-form";
import useTodoAPI from "./api/useTodoAPI";

function App() {
  const { register, handleSubmit, reset } = useForm<AddTodoType>();

  const { todos, isEdit, selectEditTodo, addTodo, editTodo, deleteTodo } =
    useTodoAPI(reset);

  return (
    <>
      <form onSubmit={handleSubmit(addTodo)}>
        <input {...register("todo")} type="text" />
        <button type="submit">add</button>
      </form>
      {todos.map((todo) => (
        <div key={todo.id} style={{ display: "flex" }}>
          {isEdit.id === todo.id ? (
            <form onSubmit={handleSubmit(editTodo)}>
              <input {...register("editTodoName")} type="text" />
              <button>send</button>
            </form>
          ) : (
            <>
              <p>{todo.todo}</p>
              <button onClick={() => selectEditTodo(todo)}>edit</button>
            </>
          )}

          <button onClick={() => deleteTodo(todo.id)}>delete</button>
        </div>
      ))}
    </>
  );
}

export default App;
