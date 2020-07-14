import { Todo } from '../../types';

export const ADD_TODO_REQUEST = '[Todo] add todo request';
export const ADD_TODO_SUCCESS = '[Todo] add todo success';
export const REMOVE_TODO = '[Todo] remove todo';
export const TOGGLE_TODO = '[Todo] toggle todo';
export const FETCH_TODO_REQUEST = '[Todo] fetch request';
export const FETCH_TODO_SUCCESS = '[Todo] fetch success';
export const FETCH_TODO_FAIL = '[Todo] fetch fail';
export const UPDATE_TODO = '[Todo] update todo';

export interface AddTodoRequest {
  type: typeof ADD_TODO_REQUEST;
  payload: Omit<Todo, 'id'>;
}

export interface AddTodoSuccess {
  type: typeof ADD_TODO_SUCCESS;
  payload: Todo;
}

export interface RemoveTodo {
  type: typeof REMOVE_TODO;
  payload: Todo;
}

export interface ToggleTodo {
  type: typeof TOGGLE_TODO;
  payload: Todo;
}

export interface FetchTodoRequest {
  type: typeof FETCH_TODO_REQUEST;
}

export interface FetchTodoSuccess {
  type: typeof FETCH_TODO_SUCCESS;
  payload: Todo[];
}

export interface FetchTodoFail {
  type: typeof FETCH_TODO_FAIL;
  payload: string; // error message
}

export interface UpdateTodo {
  type: typeof UPDATE_TODO;
  payload: {
    todoId: number;
    todoChanges: Omit<Todo, 'id'>;
  };
}

export type TodosActions =
  | AddTodoRequest
  | AddTodoSuccess
  | RemoveTodo
  | ToggleTodo
  | UpdateTodo
  | FetchTodoRequest
  | FetchTodoSuccess
  | FetchTodoFail;
