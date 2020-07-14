import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Grid,
  List,
  Container,
  Card,
  CardContent,
  CardActions,
  Fab,
  ListItem,
  TextField,
  Button,
} from '@material-ui/core';
import { Add, Done } from '@material-ui/icons';
import * as TodoActions from '../redux/todos/todos.actions';

import TodoItem from '../components/TodoItem';
import { RootState } from '../redux/store';
import { Todo } from '../types';
import './MyTodos.scss';

interface MyTodosState {
  todos: Todo[];
  error: string;
}

const MyTodos: React.FC = () => {
  /**
   * Select todos from state
   */
  const { todos, error } = useSelector<RootState, MyTodosState>(
    (state: RootState) => {
      return { todos: state.todos, error: state.error };
    }
  );
  const dispatch = useDispatch();

  /**
   * State of component
   * editMode - mode when user can create new TODO
   * newTodoTitle - title of new todo, can be set by user only in editMode
   */
  const [editMode, setEditMode] = React.useState<boolean>(false);
  const [newTodoTitle, setNewTodoTitle] = React.useState<string>('');

  /**
   * Opens editMode
   */
  const onSetEditMode = () => setEditMode(true);

  /**
   * Handler for new todo creation,
   */
  const handleNewTodoInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target as HTMLInputElement;
    setNewTodoTitle(value);
  };

  /**
   * If inputs are valid, new todo will bew created
   * by dispatching action for create todo
   *
   */
  const onCreateTodo = () => {
    if (newTodoTitle.length > 0) {
      dispatch(
        TodoActions.addTodoRequest({ status: 'pending', title: newTodoTitle })
      );
    }
    setEditMode(false);
  };

  return (
    <Container fixed className="my-todos">
      <Grid container direction="column" justify="center" alignItems="center">
        <Card className="card">
          <CardContent>
            <List>
              {todos.map((todo, index) => (
                <TodoItem className="todo-item" todo={todo} key={index} />
              ))}
              {editMode && (
                <ListItem>
                  <TextField
                    fullWidth
                    id="standard-basic"
                    label="Add TODO!"
                    onChange={handleNewTodoInput}
                  />
                </ListItem>
              )}
            </List>
          </CardContent>
          <CardActions className="card-actions">
            {!editMode && (
              <Fab className="fab-button" onClick={onSetEditMode}>
                <Add color="secondary" />
              </Fab>
            )}
            {editMode && (
              <Fab className="fab-button" onClick={onCreateTodo}>
                <Done color="primary" />
              </Fab>
            )}
          </CardActions>
        </Card>
      </Grid>
    </Container>
  );
};

export default MyTodos;
