import React, { MouseEvent } from 'react';
import { Dispatch, AnyAction } from 'redux';
import { Todo, TodoAppState } from '../types';
import { actionCreators as todoActionCreators } from './todos-redux';
import TodoList from './TodoList';
import { connect } from 'react-redux';
import { CircularProgress } from '@material-ui/core';

type TodoPageProps = {
  todos: Todo[];
  isLoading: boolean;
  findAll(): AnyAction;
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
        <h1>Todos</h1>
        <div>
          {!this.props.isLoading ? (
            <TodoList todos={this.props.todos} />
          ) : (
            <CircularProgress size="64px" />
          )}
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.props.findAll();
  }

  handleFetchClick(event: MouseEvent<HTMLButtonElement>): void {
    event.preventDefault();
    event.stopPropagation();
    this.props.findAll();
  }
}

function mapStateToProps(state: TodoAppState) {
  return { todos: state.todos, isLoading: state.isLoading };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    findAll: () => dispatch(todoActionCreators.findAll())
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoPage);
