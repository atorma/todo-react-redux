import React from 'react';
import { Todo } from '../types';
import TodoItem from './TodoItem';

type TodoListProps = {
  todos: Todo[];
};

type TodoListState = {};

class TodoList extends React.Component<TodoListProps, TodoListState> {
  render() {
    return (
      <ul>
        {this.props.todos.map((todo: Todo) => (
          <li key={todo.id}>
            <TodoItem todo={todo} />
          </li>
        ))}
      </ul>
    );
  }
}
export default TodoList;
