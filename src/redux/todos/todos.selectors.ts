import { RootState } from '../store';
import { Todo } from '../../types';

export const selectAllTodos = (state: RootState): Todo[] => state.todos;

export const selectPendingTodos = (state: RootState): Todo[] =>
  state.todos.filter((todo) => todo.status === 'pending');

export const selectCompletedTodos = (state: RootState): Todo[] =>
  state.todos.filter((todo) => todo.status === 'completed');

export const selectError = (state: RootState): string => state.error;

export const selectLoading = (state: RootState): boolean => state.loading;
