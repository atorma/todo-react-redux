import React, { MouseEvent } from 'react';
import { Todo, TodoAppState } from '../types';
import { AnyAction, Dispatch } from 'redux';
import { actionCreators as todoActionCreators } from './todos-redux';
import { connect } from 'react-redux';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

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

type OwnState = {
  isEditing: boolean;
};

class TodoItem extends React.Component<Props, OwnState> {
  constructor(props: Props) {
    super(props);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleSaveClick = this.handleSaveClick.bind(this);
    this.handleCancelClick = this.handleCancelClick.bind(this);
    this.state = {
      isEditing: false
    };
  }

  render() {
    return (
      <Card>
        <CardHeader title={this.props.todo.title} />
        <CardContent></CardContent>
        <CardActions>
          {!this.state.isEditing && (
            <Button onClick={this.handleDeleteClick} disabled={this.props.isProcessing}>
              Delete
            </Button>
          )}
          {!this.state.isEditing && (
            <Button onClick={this.handleEditClick} disabled={this.props.isProcessing}>
              Edit
            </Button>
          )}
          {this.state.isEditing && (
            <Button onClick={this.handleCancelClick} disabled={this.props.isProcessing}>
              Cancel
            </Button>
          )}
          {this.state.isEditing && (
            <Button onClick={this.handleSaveClick} disabled={this.props.isProcessing}>
              Save
            </Button>
          )}
        </CardActions>
      </Card>
    );
  }

  handleDeleteClick(event: MouseEvent<HTMLButtonElement>): void {
    event.preventDefault();
    event.stopPropagation();
    this.props.deleteTodo(this.props.todo);
  }

  handleEditClick(event: MouseEvent<HTMLButtonElement>): void {
    event.preventDefault();
    event.stopPropagation();
    this.setState({ isEditing: true });
  }

  handleSaveClick(event: MouseEvent<HTMLButtonElement>): void {
    event.preventDefault();
    event.stopPropagation();
    this.setState({ isEditing: false });
  }

  handleCancelClick(event: MouseEvent<HTMLButtonElement>): void {
    event.preventDefault();
    event.stopPropagation();
    this.setState({ isEditing: false });
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
