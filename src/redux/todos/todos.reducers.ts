import { Todo } from '../../types';
import * as todosTypes from './todos.types';

export interface TodoState {
  todos: Todo[];
  loading: boolean;
  error: string;
}

const initialState: TodoState = {
  todos: [],
  loading: false,
  error: '',
};

export function todosReducer(
  state = initialState,
  action: todosTypes.TodosActions
): TodoState {
  switch (action.type) {
    case todosTypes.ADD_TODO_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case todosTypes.ADD_TODO_SUCCESS:
      return {
        ...state,
        loading: false,
        todos: [...state.todos, action.payload],
      };
    case todosTypes.REMOVE_TODO:
      return {
        ...state,
        todos: [...state.todos.filter((todo) => todo.id !== action.payload.id)],
      };
    case todosTypes.TOGGLE_TODO:
      const newTodosState: Todo[] = state.todos.map((todo) => {
        if (todo.id === action.payload.id) {
          return {
            ...todo,
            status: todo.status === 'completed' ? 'pending' : 'completed',
          };
        }
        return todo;
      });
      return {
        ...state,
        todos: newTodosState,
      };
    case todosTypes.UPDATE_TODO:
      const newTodoState: Todo[] = state.todos.map((todo) => {
        if (todo.id === action.payload.todoId) {
          return {
            ...todo,
            ...action.payload.todoChanges,
          };
        } else {
          return todo;
        }
      });
      return {
        ...state,
        todos: newTodoState,
      };
    case todosTypes.FETCH_TODO_REQUEST:
      return {
        ...state,
        loading: true,
        error: '',
      };
    case todosTypes.FETCH_TODO_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
        todos: [...action.payload],
      };
    case todosTypes.FETCH_TODO_FAIL:
      return {
        ...state,
        todos: [],
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
