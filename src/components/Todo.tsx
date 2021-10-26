import { useState } from 'react';
import useTodo from '../hooks/useTodo';

const Todo = (props: any) => {
  const [title, setTitle] = useState('');
  const { todos, addTodo, deleteTodo } = useTodo();

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  }

  return (
    <div>
      <input type="text"
        value={title}
        onChange={onChangeHandler}
        onKeyUp={e => {
        if (e.key === 'Enter') {
          addTodo(title);
          setTitle('');
        }
      }} placeholder="press enter to create todo" />
      <ul>
        {
          todos.map(todo => (
            <li key={todo.id}>
              {todo.title}
              {todo.state}
              <button onClick={e => {
                deleteTodo(todo.id)
              }}>del</button>
            </li>
          ))
        }
      </ul>
    </div>
  )
}

export default Todo;