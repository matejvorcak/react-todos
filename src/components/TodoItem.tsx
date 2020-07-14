import * as React from 'react';
import { Todo } from '../types';
import {
  ListItem,
  Checkbox,
  ListItemText,
  IconButton,
} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import * as TodoActions from '../redux/todos/todos.actions';
import { Edit, Delete } from '@material-ui/icons';
import { Link } from 'react-router-dom';

export interface TodoItemProps {
  todo: Todo;
  className: string;
}

const TodoItem: React.FC<TodoItemProps> = (props) => {
  const dispatch = useDispatch();
  const onToggleTodo = () => {
    dispatch(TodoActions.toggleTodo(props.todo));
  };
  const [showActionIcons, setShowActionIcons] = React.useState(false);
  const onShowActionIcons = () => setShowActionIcons(true);
  const onHideActionIcons = () => setShowActionIcons(false);
  const onRemoveTodo = () => dispatch(TodoActions.removeTodo(props.todo));

  return (
    <ListItem
      className={props.className}
      onMouseEnter={onShowActionIcons}
      onMouseLeave={onHideActionIcons}
    >
      <Checkbox
        onClick={onToggleTodo}
        checked={props.todo.status === 'completed'}
        color="primary"
        inputProps={{ 'aria-label': 'secondary checkbox' }}
      />

      <ListItemText>
        <Link to={'/me/todos/' + props.todo.id}>{props.todo.title}</Link>
      </ListItemText>

      {showActionIcons && (
        <Link to={'/me/todos/' + props.todo.id}>
          <IconButton edge="end" aria-label="comments">
            <Edit color="primary" />
          </IconButton>
        </Link>
      )}
      {showActionIcons && (
        <IconButton onClick={onRemoveTodo} edge="end" aria-label="comments">
          <Delete color="secondary" />
        </IconButton>
      )}
    </ListItem>
  );
};

export default TodoItem;
