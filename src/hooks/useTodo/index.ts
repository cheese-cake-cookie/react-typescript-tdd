import { useState, useEffect } from 'react';
import { Todo, TodoState, getTodos } from '../../api/todo';

const useTodo = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    fetchTodo();
  }, []);

  const fetchTodo = async () => {
    const data: Todo[] = await getTodos();
    setTodos(data);
  };

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

  return {
    todos, addTodo, deleteTodo
  }
}

export default useTodo;