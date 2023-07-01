import React, { useState } from "react";
import TodoForm from "./TodoForm";
const Todo = ({ todos, completeTodo, removeTodo, updateTodo }) => {
  const [edit, setEdit] = useState({
    id: null,
    value: "",
  });

  const submitUpdate = (value) => {
    updateTodo(edit.id, value);
    setEdit({
      id: null,
      value: "",
    });
  };

  if (edit.id) {
    return <TodoForm edit={edit} onSubmit={submitUpdate} />;
  }

  console.log(todos);
  return todos.map((todo, index) => (
    <div
      className={todo.isComplete ? "todo-row complete" : "todo-row"}
      key={index}
    >
      <span className="i-check" onClick={() => completeTodo(todo.id)}></span>
      <p key={todo.id} onClick={() => completeTodo(todo.id)}>
        {todo.text}
      </p>
      <span
        onClick={() => setEdit({ id: todo.id, value: todo.text })}
        className="i-edit"
      ></span>
      <span onClick={() => removeTodo(todo.id)} className="i-cross"></span>
    </div>
  ));
};

export default Todo;
