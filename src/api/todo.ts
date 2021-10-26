import axios from 'axios';

export type TodoState = 'BACKLOG' | 'INPROGRESS' | 'DONE';
export interface Todo {
  id: number,
  title: string,
  state: TodoState,
}

const getTodos = async (): Promise<Todo[]> => {
  const { data }: { data: { data: Todo[], totalCount?: number } } = await axios.get('/json/todo.json');
  
  return data.data;
}

export {
  getTodos
}