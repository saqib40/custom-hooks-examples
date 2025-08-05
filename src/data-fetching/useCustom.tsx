// Second Part
// First consider => component.tsx
// Converting the data fetching bit to a custom hook

import { useEffect, useState } from 'react'
import axios from 'axios'

interface Todo {
  id: number,
  title : string,
  completed: boolean,
}

function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([])

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/todos?_limit=5")
      .then(res => {
        console.log("custom component");
        setTodos(res.data);
      })
  }, [])

  return todos;
}

function CustomComp() {
  const todos = useTodos();

  return (
    <>
      {todos.map(todo => <Track key={todo.id} todo={todo} />)}
    </>
  )
}

function Track({ todo } : {todo : Todo}) {
  return (
    <div style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>
      <h3>{todo.title}</h3>
      <p>Completed: {todo.completed ? 'Yes' : 'No'}</p>
    </div>
  )
}

export default CustomComp;