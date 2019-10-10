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
      <div>
        {this.props.todos.map((todo: Todo) => (
          <div key={todo.id}>
            <TodoItem todo={todo} />
          </div>
        ))}
      </div>
    );
  }
}
export default TodoList;
