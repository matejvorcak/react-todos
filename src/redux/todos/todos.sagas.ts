import { takeLatest, put, call, select } from 'redux-saga/effects';
import * as todoTypes from './todos.types';
import * as todoActions from './todos.actions';
import { Todo } from '../../types';
import * as api from '../../api';
import { RootState } from '../store';

/**
 * FETCH TODOS
 */
export function* watchLoadTodos() {
  yield takeLatest(todoTypes.FETCH_TODO_REQUEST, fetchTodos);
}

function* fetchTodos() {
  try {
    const todos: Todo[] = yield call(api.fetchTodos);
    yield put(todoActions.fetchTodoSuccess(todos));
  } catch (e) {
    yield put(todoActions.fetchTodoFail(e.message));
  }
}

/**
 * ADD TODO
 */
export function* watchAddTodo() {
  const action = yield takeLatest(
    todoTypes.ADD_TODO_REQUEST,
    createUniqueIdForTodo
  );
}

function* createUniqueIdForTodo(action: todoTypes.AddTodoRequest) {
  const todos: Todo[] = yield select((state: RootState) => state.todos);
  const maxId = Math.max(...todos.map((todo) => todo.id));
  yield put(
    todoActions.addTodoSuccess({
      ...action.payload,
      id: maxId + 1,
    })
  );
}
