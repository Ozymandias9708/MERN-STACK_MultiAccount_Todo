import React from "react";
import "./todostyle.css";
import TodoList from "./todocomponents/TodoList";

function TodoApp({user,setLoginUser,body}) {
  // body.style.background-color=black;
  // body.style={{backgroundColor:yellow}}
  body.style.background="url(https://i.pinimg.com/736x/f5/4a/13/f54a13424b5bec338306cb84aef3a16e.jpg)"
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
