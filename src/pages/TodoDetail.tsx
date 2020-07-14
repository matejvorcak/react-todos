import React from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  IconButton,
  TextField,
  Checkbox,
  ListItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@material-ui/core';
import { Delete, Done, ArrowBack } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

import './TodoDetail.scss';
import { Todo } from '../types';
import * as todoActions from '../redux/todos/todos.actions';
import { RootState } from '../redux/store';

interface TodoDetailState {
  todo?: Todo;
}

interface RouteParams {
  id: string;
}

const ReduxHooksComponent: React.FC = () => {
  /**
   * Get id from url parameter :id
   */
  const params = useParams<RouteParams>();
  /**
   * Select todo from store, based on id passed as a route parameter
   */
  const { todo } = useSelector<RootState, TodoDetailState>(
    (state: RootState) => {
      return {
        todo: state.todos.find((lookForTodo) => lookForTodo.id === +params.id),
      };
    }
  );
  const [todoChanges, setTodoChanges] = React.useState<Omit<Todo, 'id'>>({
    title: '',
    status: 'pending',
  });
  const [openDialog, setOpenDialog] = React.useState<boolean>(false);

  /**
   * Check if any todo exists in store
   * If todo exists, shows formular for editing todos else shows dialog with error message
   */
  React.useEffect(() => {
    if (todo) {
      setTodoChanges({
        title: todo?.title,
        status: todo?.status,
      });
    } else {
      setOpenDialog(true);
    }
  }, [todo]);

  const history = useHistory();
  const dispatch = useDispatch();

  /**
   * Deletes todo from store
   * After deletion, user is redirected to TODO list
   */
  const onDelete = () => {
    if (todo) {
      dispatch(todoActions.removeTodo(todo));
      history.push('/me/todos');
    }
  };

  const handleTodoTitleUpdate = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target as HTMLInputElement;
    setTodoChanges({
      ...todoChanges,
      title: value,
    });
  };

  const handleTodoStatusUpdate = () => {
    const status = todoChanges.status === 'completed' ? 'pending' : 'completed';
    setTodoChanges({
      ...todoChanges,
      status,
    });
  };
  const onGoBack = () => history.push('/me/todos');

  /**
   * Applies chcanges to todo
   */
  const onApplyChanges = () => {
    dispatch(todoActions.updateTodo(todo?.id || -1, todoChanges));
    onGoBack();
  };

  return (
    <Container fixed className="todo-detail">
      <Grid container direction="column" justify="center" alignItems="center">
        <Card className="card">
          <div className="card-action-buttons">
            <IconButton
              onClick={onApplyChanges}
              edge="end"
              aria-label="comments"
            >
              <Done color="primary" />
            </IconButton>
            <IconButton onClick={onDelete} edge="end" aria-label="comments">
              <Delete color="secondary" />
            </IconButton>
          </div>
          <CardContent>
            <Grid container direction="row" alignItems="center">
              <Grid item>
                <IconButton onClick={onGoBack} edge="end" aria-label="comments">
                  <ArrowBack />
                </IconButton>
              </Grid>
              <Grid item>
                <h2>Wana update your TODO?</h2>
              </Grid>
            </Grid>
            <ListItem>
              <Checkbox
                name="status"
                onClick={handleTodoStatusUpdate}
                checked={todoChanges.status === 'completed'}
                color="primary"
                inputProps={{ 'aria-label': 'secondary checkbox' }}
              />
              <TextField
                name="title"
                fullWidth
                id="standard-basic"
                onChange={handleTodoTitleUpdate}
                value={todoChanges.title}
              />
            </ListItem>
          </CardContent>
        </Card>
      </Grid>
      <Dialog open={openDialog}>
        <DialogTitle id="alert-dialog-title">
          TODO does not exists. 🙃
        </DialogTitle>
        <DialogContent>
          <DialogContentText>Sorry we cannot find your TODO.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onGoBack} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ReduxHooksComponent;
