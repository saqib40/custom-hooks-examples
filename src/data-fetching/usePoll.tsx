// Part 4
// Auto refreshing hook
// What if you want to keep polling the backend every n seconds? n needs to be passed in as an input to the hook
import { useEffect, useState } from 'react'
import axios from 'axios'

interface Todo {
  id: number,
  title : string,
  completed: boolean,
}

function useTodos(n : number) {
  const [loading, setLoading] = useState<boolean>(true);
  const [todos, setTodos] = useState<Todo[]>([])

  function getData() {
    axios.get("https://jsonplaceholder.typicode.com/todos?_limit=5")
      .then(res => {
        console.log("poll component");
        setTodos(res.data);
        setLoading(false);
      })
  }

  useEffect(() => {
    getData(); // fetch data immediately
    const intervalId = setInterval(() => {getData();}, n * 1000); // interval setup
    return () => {clearInterval(intervalId);} // clear interval during unmount very important
  }, [n])

  return {
    todos: todos,
    loading: loading
  };
}

function PollComp() {
  const { todos, loading } = useTodos(5);

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

export default PollComp;