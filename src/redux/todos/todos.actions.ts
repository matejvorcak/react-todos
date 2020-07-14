import * as todosTypes from './todos.types';
import { Todo } from '../../types';

export function addTodoRequest(
  todo: Omit<Todo, 'id'>
): todosTypes.AddTodoRequest {
  return {
    type: todosTypes.ADD_TODO_REQUEST,
    payload: todo,
  };
}

export function addTodoSuccess(todo: Todo): todosTypes.AddTodoSuccess {
  return {
    type: todosTypes.ADD_TODO_SUCCESS,
    payload: todo,
  };
}

export function removeTodo(todo: Todo): todosTypes.RemoveTodo {
  return {
    type: todosTypes.REMOVE_TODO,
    payload: todo,
  };
}

export function toggleTodo(todo: Todo): todosTypes.ToggleTodo {
  return {
    type: todosTypes.TOGGLE_TODO,
    payload: todo,
  };
}

export function fetchTodoRequest(): todosTypes.FetchTodoRequest {
  return {
    type: todosTypes.FETCH_TODO_REQUEST,
  };
}

export function fetchTodoSuccess(todos: Todo[]): todosTypes.FetchTodoSuccess {
  return {
    type: todosTypes.FETCH_TODO_SUCCESS,
    payload: todos,
  };
}

export function fetchTodoFail(error: string): todosTypes.FetchTodoFail {
  return {
    type: todosTypes.FETCH_TODO_FAIL,
    payload: error,
  };
}

export function updateTodo(
  todoId: number,
  todoChanges: Omit<Todo, 'id'>
): todosTypes.UpdateTodo {
  return {
    type: todosTypes.UPDATE_TODO,
    payload: { todoId, todoChanges },
  };
}
