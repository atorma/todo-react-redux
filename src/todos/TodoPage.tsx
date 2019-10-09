import React, { MouseEvent } from 'react';
import { Dispatch, AnyAction } from 'redux';
import { Todo, TodoAppState } from '../types';
import { actionCreators as todoActionCreators } from './todos-redux';
import TodoList from './TodoList';
import { connect } from 'react-redux';

type TodoPageProps = {
  todos: Todo[];
  isProcessing: boolean;
  fetchTodos(): AnyAction;
};

type TodoPageState = {};

class TodoPage extends React.Component<TodoPageProps, TodoPageState> {
  constructor(props: TodoPageProps) {
    super(props);
    this.handleFetchClick = this.handleFetchClick.bind(this);
  }

  render() {
    return (
      <div>
        <div>
          <button type="button" onClick={this.handleFetchClick} disabled={this.props.isProcessing}>
            Fetch
          </button>
        </div>
        <div>
          {!this.props.isProcessing ? (
            <TodoList todos={this.props.todos} isProcessing={this.props.isProcessing} />
          ) : (
            'Loading...'
          )}
        </div>
      </div>
    );
  }

  handleFetchClick(event: MouseEvent<HTMLButtonElement>): void {
    event.preventDefault();
    event.stopPropagation();
    this.props.fetchTodos();
  }
}

function mapStateToProps(state: TodoAppState) {
  return state;
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    fetchTodos: () => dispatch(todoActionCreators.fetchTodos())
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoPage);
