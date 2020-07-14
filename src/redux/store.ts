import { createStore, compose, applyMiddleware } from 'redux';
import * as fromTodos from './todos/todos.reducers';
import * as todoSagas from './todos/todos.sagas';
import createSagaMiddleware from 'redux-saga';

/**
 * fix to redux devtools can work
 */
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export type RootState = fromTodos.TodoState;

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
  fromTodos.todosReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(todoSagas.watchLoadTodos);
sagaMiddleware.run(todoSagas.watchAddTodo);
