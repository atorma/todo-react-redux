import { AnyAction } from 'redux';
import { ofType } from 'redux-observable';
import { combineEpics } from 'redux-observable';
import { Todo } from '../types';
import todoService from './todo-service';
import { concatMap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import _ from 'lodash';

enum TodoActionType {
  FIND_ALL = 'TODO_FIND_ALL',
  FIND_ALL_FULFILLED = 'TODO_FIND_ALL_FULFILLED',
  DELETE = 'TODO_DELETE',
  DELETE_FULFILLED = 'DELETE_FULFILLED',
  SAVE = 'TODO_SAVE',
  SAVE_FULFILLED = 'TODO_SAVE_FULFILLED'
}

function findAll() {
  return { type: TodoActionType.FIND_ALL };
}
function findAllFulfilled(todos: Todo[]) {
  return { type: TodoActionType.FIND_ALL_FULFILLED, todos };
}
const findAllEpic = (action$: Observable<AnyAction>) => {
  return action$.pipe(
    ofType(TodoActionType.FIND_ALL),
    concatMap(todoService.findAll),
    map(findAllFulfilled)
  );
};

function del(todo: Todo): AnyAction {
  return { type: TodoActionType.DELETE, todo };
}
function delFulfilled(todo: Todo): AnyAction {
  return { type: TodoActionType.DELETE_FULFILLED, todo };
}
const delEpic = (action$: Observable<AnyAction>) => {
  return action$.pipe(
    ofType(TodoActionType.DELETE),
    concatMap(action => todoService.delete(action.todo)),
    map(delFulfilled)
  );
};

function save(todo: Todo): AnyAction {
  return { type: TodoActionType.SAVE, todo };
}
function saveFulfilled(todo: Todo): AnyAction {
  return { type: TodoActionType.SAVE_FULFILLED, todo };
}
const saveEpic = (action$: Observable<AnyAction>) => {
  return action$.pipe(
    ofType(TodoActionType.SAVE),
    concatMap(action => todoService.save(action.todo)),
    map(saveFulfilled)
  );
};

function todosReducer(todos: Todo[] = [], action: AnyAction) {
  switch (action.type) {
    case TodoActionType.FIND_ALL_FULFILLED:
      return action.todos;
    case TodoActionType.DELETE_FULFILLED:
      if (!action.todo) {
        return todos;
      }
      return _.filter(todos, todo => todo.id !== action.todo.id);
    case TodoActionType.SAVE_FULFILLED:
      todos = _.clone(todos);
      const oldTodoIndex: number = _.findIndex(todos, { id: action.todo.id });
      if (oldTodoIndex > -1) {
        todos[oldTodoIndex] = action.todo;
      } else {
        todos.push(action.todo);
      }
      return todos;
    default:
      return todos;
  }
}

function isLoadingReducer(state: boolean = false, action: AnyAction) {
  switch (action.type) {
    case TodoActionType.FIND_ALL:
      return true;
    case TodoActionType.FIND_ALL_FULFILLED:
      return false;
    default:
      return state;
  }
}

function isProcessingTodoReducer(state: { [todoId: string]: boolean } = {}, action: AnyAction) {
  switch (action.type) {
    case TodoActionType.SAVE:
    case TodoActionType.DELETE:
      if (!action.todo || !action.todo.id) {
        return state;
      }
      return Object.assign({}, state, { [action.todo.id]: true });
    case TodoActionType.SAVE_FULFILLED:
    case TodoActionType.DELETE_FULFILLED:
      if (!action.todo || !action.todo.id) {
        return state;
      }
      state = Object.assign({}, state);
      delete state[action.todo.id];
      return state;
    default:
      return state;
  }
}

export const actionCreators = {
  findAll,
  save,
  del
};

export const reducers = {
  todos: todosReducer,
  isLoading: isLoadingReducer,
  isProcessingTodo: isProcessingTodoReducer
};

export const rootEpic = combineEpics(findAllEpic, saveEpic, delEpic);
