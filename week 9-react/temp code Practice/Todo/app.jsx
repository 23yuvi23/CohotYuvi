import { useState } from 'react'
import './App.css'

export default function App() {

  const [todos, setTodos] = useState([
    {
      id: 1,
      title: "todo 1",
      description: "todo 1 description",
      completed: false
    }
  ])

  function addTodo() {

    const newTodo = {
      id: todos.length + 1,
      title: document.getElementById("title").value,
      description: document.getElementById("desc").value,
      completed: false
    }

    setTodos([...todos, newTodo])
  }

  return (
    <div>
      <input id="title" type="text" placeholder="title" />
      <input id="desc" type="text" placeholder="description" />
      <br /><br />

      <button onClick={addTodo}>Add a todo</button>

      <br /><br /><br />

      {/* Rendering all todos */}
      {todos.map((todo) =>
        <Todo
          key={todo.id}
          title={todo.title}
          desc={todo.description}
          completed={todo.completed}
        />
      )}
    </div>
  )
}

function Todo({ title, desc, completed }) {
  return (
    <div style={{ marginBottom: "20px" }}>
      <h1>{title}</h1>
      <h2>{desc}</h2>
      <h3>{completed ? "Task is done" : "Task is not done"}</h3>
      <hr />
    </div>
  )
}
