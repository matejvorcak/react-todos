import React, { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import { Button, Grid } from '@material-ui/core';
import { BrowserRouter as Router, Link } from 'react-router-dom';

import { store as appStoreInitialization } from './redux/store';
import './App.scss';
import RouterOutlet from './components/RouterOutlet';
import { Store, AnyAction } from 'redux';
import * as TodoActions from './redux/todos/todos.actions';

const App: React.FC = () => {
  const [store] = useState<Store<any, AnyAction>>(appStoreInitialization);

  /**
   * Dispatch load todos from api on application startup
   */
  useEffect(() => {
    store.dispatch(TodoActions.fetchTodoRequest());
  }, [store]);

  return (
    <Provider store={store}>
      <Router>
        <Grid
          className="main-container"
          container
          direction="column"
          justify="space-evenly"
          alignItems="center"
        >
          <Grid
            className="menu"
            container
            direction="row"
            justify="space-evenly"
            alignItems="center"
          >
            <div>
              <Link to="/">
                <Button>Home</Button>
              </Link>
            </div>
            <div>
              <Link to="/me/todos">
                <Button>My Todos</Button>
              </Link>
            </div>
          </Grid>
          <div className="router-outlet-wrapper">
            <RouterOutlet className="router-outlet" />
          </div>
        </Grid>
      </Router>
    </Provider>
  );
};

export default App;
