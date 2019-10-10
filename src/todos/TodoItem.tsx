import React, { MouseEvent } from 'react';
import { Todo, TodoAppState } from '../types';
import { AnyAction, Dispatch } from 'redux';
import { actionCreators as todoActionCreators } from './todos-redux';
import { connect } from 'react-redux';

type OwnProps = {
  todo: Todo;
};
type StateProps = {
  isProcessing: boolean;
};
type DispatchProps = {
  deleteTodo(todo: Todo): AnyAction;
};
type Props = StateProps & DispatchProps & OwnProps;

type State = {};

class TodoItem extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
  }

  render() {
    return (
      <div className="todo-item">
        <h2 className="todo-item__title">{this.props.todo.title}</h2>
        <span>
          <button onClick={this.handleDeleteClick} disabled={this.props.isProcessing}>
            Delete
          </button>
        </span>
      </div>
    );
  }

  handleDeleteClick(event: MouseEvent<HTMLButtonElement>): void {
    event.preventDefault();
    event.stopPropagation();
    this.props.deleteTodo(this.props.todo);
  }
}

function mapStateToProps(state: TodoAppState, ownProps: OwnProps): StateProps {
  return {
    isProcessing: state.isProcessingTodo[ownProps.todo.id]
  };
}

function mapDispatchToProps(dispatch: Dispatch): DispatchProps {
  return {
    deleteTodo: (todo: Todo) => dispatch(todoActionCreators.del(todo))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoItem);
