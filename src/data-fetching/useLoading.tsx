// Part 3
// What if you want to show a loader when the data is not yet fetched from the backend?
import { useEffect, useState } from 'react'
import axios from 'axios'

interface Todo {
  id: number,
  title : string,
  completed: boolean,
}

function useTodos() {
  const [loading, setLoading] = useState<boolean>(true);
  const [todos, setTodos] = useState<Todo[]>([])

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/todos?_limit=5")
      .then(res => {
        console.log("loading component");
        setTodos(res.data);
        setLoading(false);
      })
  }, [])

  return {
    todos: todos,
    loading: loading
  };
}

function LoadingComp() {
  const { todos, loading } = useTodos();

  if (loading) {
    return <div>
      Loading...
    </div>
  }

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

export default LoadingComp;