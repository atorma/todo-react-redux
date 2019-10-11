import React, { MouseEvent } from 'react';
import { Todo, TodoAppState } from '../types';
import TodoItem from './TodoItem';
import { Button } from '@material-ui/core';
import { AnyAction, Dispatch } from 'redux';
import { actionCreators as todoActionCreators } from './todos-redux';
import { connect } from 'react-redux';

type OwnProps = {
  todos: Todo[];
};
type StateProps = {};
type DispatchProps = { saveTodo(todo: Todo): AnyAction };
type Props = StateProps & DispatchProps & OwnProps;

type OwnState = {};

class TodoList extends React.Component<Props, OwnState> {
  constructor(props: Props) {
    super(props);
    this.handleAddNewClick = this.handleAddNewClick.bind(this);
  }

  render() {
    return (
      <div>
        {this.props.todos.map((todo: Todo) => (
          <div key={todo.id}>
            <TodoItem todo={todo} />
          </div>
        ))}
        <div>
          <Button onClick={this.handleAddNewClick}>Add new</Button>
        </div>
      </div>
    );
  }

  handleAddNewClick(event: MouseEvent<HTMLButtonElement>): void {
    event.preventDefault();
    event.stopPropagation();
    this.props.saveTodo({ id: '', title: 'New todo' });
  }
}

function mapStateToProps(state: TodoAppState, ownProps: OwnProps): StateProps {
  return {};
}

function mapDispatchToProps(dispatch: Dispatch): DispatchProps {
  return {
    saveTodo: (todo: Todo) => dispatch(todoActionCreators.save(todo))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList);
