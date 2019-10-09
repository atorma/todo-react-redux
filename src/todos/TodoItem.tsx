import React from 'react';
import { Todo } from '../types';

type TodoItemProps = {
  todo: Todo;
};

type TodoItemState = {};

class TodoItem extends React.Component<TodoItemProps, TodoItemState> {
  render() {
    return (
      <div className="todo-item">
        <h2 className="todo-item__title">{this.props.todo.title}</h2>
      </div>
    );
  }
}

export default TodoItem;
