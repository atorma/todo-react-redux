import React, { ChangeEvent, FormEvent, MouseEvent } from 'react';
import { Todo, TodoAppState } from '../types';
import { AnyAction, Dispatch } from 'redux';
import { actionCreators as todoActionCreators } from './todos-redux';
import { connect } from 'react-redux';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import _ from 'lodash';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import Box from '@material-ui/core/Box';
import { Checkbox } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

type OwnProps = {
  todo: Todo;
};
type StateProps = {
  isProcessing: boolean;
};
type DispatchProps = {
  deleteTodo(todo: Todo): AnyAction;
  saveTodo(todo: Todo): AnyAction;
};
type Props = StateProps & DispatchProps & OwnProps;

type OwnState = {
  isEditing: boolean;
  savedTodo: Todo;
  todo: Todo;
};

class TodoItem extends React.Component<Props, OwnState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isEditing: false,
      savedTodo: _.cloneDeep(props.todo),
      todo: _.cloneDeep(props.todo)
    };
  }

  render() {
    return (
      <Box my={1}>
        <form onSubmit={this.handleSubmit} noValidate autoComplete="off">
          <Card>
            <CardContent>
              <Grid container direction="row">
                <div>
                  <Checkbox
                    checked={this.state.todo.isCompleted}
                    onChange={this.handleIsCompletedChange}
                    inputProps={{
                      'aria-label': 'Is completed'
                    }}
                  />
                </div>
                <div>
                  {this.state.isEditing ? (
                    <>
                      <Input
                        value={this.state.todo.title}
                        placeholder="Title"
                        fullWidth={true}
                        disabled={this.props.isProcessing}
                        onChange={this.handleTitleChange}
                      />
                      <Input
                        multiline={true}
                        value={this.state.todo.description}
                        placeholder="Description"
                        fullWidth={true}
                        disabled={this.props.isProcessing}
                        onChange={this.handleDescriptionChange}
                      />
                    </>
                  ) : (
                    <>
                      <Typography gutterBottom variant="h5" component="h2">
                        {this.state.todo.title}
                      </Typography>
                      <Typography variant="body1" component="p">
                        {this.state.todo.description}
                      </Typography>
                    </>
                  )}
                </div>
              </Grid>
            </CardContent>
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
                <Button type="submit" disabled={this.props.isProcessing}>
                  Save
                </Button>
              )}
            </CardActions>
          </Card>
        </form>
      </Box>
    );
  }

  handleDeleteClick = (event: MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    event.stopPropagation();
    this.props.deleteTodo(this.props.todo);
  };

  handleEditClick = (event: MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    event.stopPropagation();
    this.setState({ isEditing: true });
  };

  handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    event.stopPropagation();
    this.props.saveTodo(this.state.todo);
  };

  handleCancelClick = (event: MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    event.stopPropagation();
    this.setState({ isEditing: false, todo: _.cloneDeep(this.state.savedTodo) });
  };

  handleTitleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    event.preventDefault();
    event.stopPropagation();
    this.setState({ todo: _.extend({}, this.state.todo, { title: event.target.value }) });
  };

  handleDescriptionChange = (event: ChangeEvent<HTMLInputElement>): void => {
    event.preventDefault();
    event.stopPropagation();
    this.setState({ todo: _.extend({}, this.state.todo, { description: event.target.value }) });
  };

  handleIsCompletedChange = (event: ChangeEvent<HTMLInputElement>): void => {
    event.preventDefault();
    event.stopPropagation();
    _.extend(this.state.todo, { isCompleted: event.target.checked });
    this.props.saveTodo(this.state.todo);
  };

  componentDidUpdate(prevProps: Props) {
    if (this.props.isProcessing !== prevProps.isProcessing) {
      this.setState({ isEditing: false });
    }
  }
}

function mapStateToProps(state: TodoAppState, ownProps: OwnProps): StateProps {
  return {
    isProcessing: state.isProcessingTodo[ownProps.todo.id]
  };
}

function mapDispatchToProps(dispatch: Dispatch): DispatchProps {
  return {
    deleteTodo: (todo: Todo) => dispatch(todoActionCreators.del(todo)),
    saveTodo: (todo: Todo) => dispatch(todoActionCreators.save(todo))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoItem);
