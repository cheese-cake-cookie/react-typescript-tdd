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
  {
    id: 4,
    title: "hello",
    state: "BACKLOG",
  },
];

const mock = new MockAdapter(axios);

describe("TODO APP", () => {});
