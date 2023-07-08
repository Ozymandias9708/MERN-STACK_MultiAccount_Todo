import React from "react";
import "./todostyle.css";
import TodoList from "./todocomponents/TodoList";

function TodoApp({user,setLoginUser,body}) {
  // body.style.background-color=black;
  // body.style={{backgroundColor:yellow}}
  body.style.background="url(https://img.freepik.com/free-photo/abstract-grunge-decorative-relief-navy-blue-stucco-wall-texture-wide-angle-rough-colored-background_1258-28311.jpg?w=2000)"
  body.style.backgroundRepeat="No-Repeat"
  body.style.backgroundSize="cover"
  
  return (
    <>
      <header></header>
      <div className="todo-app">
        <div className="great"><h1>Hello, {user.name}</h1></div>
        <TodoList  user={user} setLoginUser={setLoginUser}/>
        
      </div>
    </>
  );
}

export default TodoApp;
