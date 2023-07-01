import React, { useState, useEffect } from "react";
import TodoForm from "./TodoForm";
import Todo from "./Todo";
import sunIcon from "../images/icon-sun.svg";
import moonIcon from "../images/icon-moon.svg";
import axios from "axios";
import { useHistory } from "react-router-dom"
import ReactDOM from 'react-dom';
function TodoList({user,setLoginUser}) {
  
  const history = useHistory()
  const [todos, setTodos] = useState([{ id: 1, text: "T" }]);
  // setTodos

  useEffect(() => {
    setTodos(user.todos);
  }, []);
  // Add a new todo
  const addTodo =  (todo) => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }
    const newTodos = [todo, ...todos];
     setTodos(newTodos);
  //   const handleChange = e => {
  //     const { name, value } = e.target
  //     setUser({
  //         ...user,
  //         [name]: value
  //     })
  // }
   setLoginUser({
    ...user,
    [todos]:todos,
  })
    // localStorage.setItem("todo-items", JSON.stringify(newTodos));
    // let savedTodos = await JSON.parse(localStorage.getItem("todo-items"));
    // setTodos(savedTodos);
  };

  const updateTodo =  (todoId, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }
    let prev = todos;
     prev.map((item) => {
      if (item.id == todoId) {
        item.text = newValue.text;
      }
    });


     setLoginUser({
      ...user,
      [todos]:todos,
    })
    // localStorage.setItem("todo-items", JSON.stringify(prev));
    // let savedTodos = await JSON.parse(localStorage.getItem("todo-items"));
    // setTodos(savedTodos);
  };

  const removeTodo =  (id) => {
    const removedArr = [...todos].filter((todo) => todo.id !== id);
    // localStorage.setItem("todo-items", JSON.stringify(removedArr));
    // let savedTodos = await JSON.parse(localStorage.getItem("todo-items"));
     setTodos(removedArr);
     setLoginUser({
      ...user,
      [todos]:todos,
    })
  };

  const completeTodo =  (id) => {
    let updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });
    // localStorage.setItem("todo-items", JSON.stringify(updatedTodos));
    // let savedTodos = await JSON.parse(localStorage.getItem("todo-items"));
     setTodos(updatedTodos);
     setLoginUser({
      ...user,
      [todos]:todos,
    })
  };
  let [theme, setTheme] = useState("dark-theme");
  useEffect(() => {}, []);
  const toggleTheme = () => {
    theme == "dark-theme" ? setTheme("light-theme") : setTheme("dark-theme");
  };
  useEffect(() => {
    let body = document.body;
    body.className = theme;
  }, [theme]);

  const update = () => {
    // user.todos=todos;
    console.log("update");
    user.todos = todos;
    console.log(user);
    
    console.log(todos);
     axios.post("http://localhost:9002/update", user)
     .then(res => {
      alert(res.data.message)
      setLoginUser({})
      document.getElementById("body").style.background="url(https://img.rawpixel.com/s3fs-private/rawpixel_images/website_content/rm380-02-knyfs2py.jpg?w=1200&h=1200&dpr=1&fit=clip&crop=default&fm=jpg&q=75&vib=3&con=3&usm=15&cs=srgb&bg=F4F4F3&ixlib=js-2.2.1&s=99b8d897c85bf056424a6f70f3b90d8f)"
      document.getElementById("body").style.backgroundRepeat="no-repeat"
      document.getElementById("body").style.backgroundSize="cover"

      history.push("/")
  })
    // setLoginUser({})
}

  return (
    <>
      <div className="todo-header">
        <h1>TODO</h1>
        <div className="themeToggle" onClick={toggleTheme}>
          <img src={theme == "dark-theme" ? sunIcon : moonIcon} />
        </div>
      </div>
      <TodoForm onSubmit={addTodo} />
      <div className="todo-list">
        <Todo
          todos={todos}
          completeTodo={completeTodo}
          removeTodo={removeTodo}
          updateTodo={updateTodo}
        />
      </div>
      <button className="logOut" onClick={update}>Save and Log Out</button> 
    </>
  );
}

export default TodoList;
