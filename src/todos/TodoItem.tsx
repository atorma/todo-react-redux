import React from 'react';
import { Todo } from './todos-redux';

type TodoItemProps = {
  todo: Todo;
};

class TodoItem extends React.Component<TodoItemProps> {
  render() {
    return (
      <div className="todo-item">
        <h2 className="todo-item__title">{this.props.todo.title}</h2>
      </div>
    );
  }
}

export default TodoItem;
