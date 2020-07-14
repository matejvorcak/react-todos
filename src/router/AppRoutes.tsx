import React from 'react';
import { RouteProps } from 'react-router-dom';
import Home from '../pages/Home';
import MyTodos from '../pages/MyTodos';
import TodoDetail from '../pages/TodoDetail';

const routes: RouteProps[] = [
  {
    path: '/',
    exact: true,
    component: () => <Home />,
  },
  {
    path: '/me/todos',
    exact: true,
    component: () => <MyTodos />,
  },
  {
    path: '/me/todos/:id',
    exact: true,
    component: () => <TodoDetail />,
  },
];

export default routes;
