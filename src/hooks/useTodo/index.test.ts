import { renderHook, act } from "@testing-library/react-hooks";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

import { Todo, TodoState } from "./../../api/todo";
import useTodo from ".";

const TEMP_TODOS: Todo[] = [
  {
    id: 1,
    title: "hello",
    state: "BACKLOG",
  },
  {
    id: 2,
    title: "hello",
    state: "BACKLOG",
  },
  {
    id: 3,
    title: "hello",
    state: "BACKLOG",
  },
];

const mock = new MockAdapter(axios);

describe("TODO APP", () => {
  test('add todo', async () => {
    // parameter of onGet method is actual API URL but response value is mocked data.
    mock.onGet('/json/todos.json').reply(200, { data: TEMP_TODOS });

    // simulate rendering by @testing-library/react-hooks
    const { result, rerender, waitForNextUpdate } = renderHook(() => useTodo());

    // wait for until finish useEffect hook
    await waitForNextUpdate();

    act(() => result.current.addTodo(TEMP_TODOS[0].title));
    expect(result.current.todos.length).toBe(4);

    act(() => result.current.addTodo(TEMP_TODOS[1].title));
    expect(result.current.todos.length).toBe(5);
  })
});

describe('remove todo', () => {
  let hooks: {
    current: {
      todos: Todo[],
      addTodo: (title: string) => Promise<void | undefined>,
      deleteTodo: (idx: number) => Promise<void | undefined>,
    }
  };

  // The process launch before running test();
  beforeEach(async () => {
    mock.onGet('/json/todos.json').reply(200, { data: TEMP_TODOS });

    const { result, waitForNextUpdate }: any = renderHook(() => useTodo());
    hooks = result;

    await waitForNextUpdate();

    // add 3 more todos
    act(() => hooks.current.addTodo(TEMP_TODOS[0].title));
    act(() => hooks.current.addTodo(TEMP_TODOS[1].title));
    act(() => hooks.current.addTodo(TEMP_TODOS[2].title));
  });

  test('remove first item', () => {
    expect(hooks.current.todos.length).toBe(6);

    act(() => hooks.current.deleteTodo(1));

    expect(hooks.current.todos.length).toBe(5);
  });

  test('remove last item', () => {
    expect(hooks.current.todos.length).toBe(6);
    
    act(() => hooks.current.deleteTodo(6));

    expect(hooks.current.todos.length).toBe(5);
  })
});
