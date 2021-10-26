import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

export type TodoState = 'BACKLOG' | 'INPROGRESS' | 'DONE';
export interface Todo {
  id: number,
  title: string,
  state: TodoState,
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState('');

  useEffect(() => {
    getTodos();
  }, [])

  const getTodos = async () => {
    const { data }: {data: { data: Todo[] }} = await axios.get('/json/todo.json');
    setTodos(data.data);
  }

  const addTodo = (title: string) => {
    setTodos([...todos, {
      id: todos.length + 1,
      title: title,
      state: 'BACKLOG'
    }]);
  }

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  }
  
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  }

  return (
    <div className="App">
      <input type="text"
        value={title}
        onChange={onChangeHandler}
        onKeyUp={e => {
        if (e.key === 'Enter') {
          addTodo(title);
          setTitle('');
        }
      }} placeholder="press enter to create todo" />

      {
        todos.map(todo => (
            <li key={ todo.id }>
              {todo.title}
            {todo.state}
            <button onClick={e => {
              deleteTodo(todo.id)
            }}>del</button>
            </li>
          )
        )
      }
    </div>
  );
}

export default App;
