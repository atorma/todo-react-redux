import { Action, AnyAction } from 'redux';
import { ofType } from 'redux-observable';
import { combineEpics } from 'redux-observable';
import { Todo } from '../types';
import todoService from './todo-service';
import { concatMap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

enum TodoActionType {
  FETCH_TODOS = 'FETCH_TODOS',
  FETCH_TODOS_FULFILLED = 'FETCH_TODOS_FULFILLED'
}

function fetchTodos() {
  return { type: TodoActionType.FETCH_TODOS };
}
function fetchTodosFulfilled(todos: Todo[]) {
  return { type: TodoActionType.FETCH_TODOS_FULFILLED, todos };
}

const fetchTodosEpic = (action$: Observable<Action>) => {
  return action$.pipe(
    ofType(TodoActionType.FETCH_TODOS),
    concatMap(todoService.findAll),
    map(fetchTodosFulfilled)
  );
};

function todosReducer(state: Todo[] = [], action: AnyAction) {
  switch (action.type) {
    case TodoActionType.FETCH_TODOS_FULFILLED:
      return action.todos;
    default:
      return state;
  }
}

function isProcessingReducer(state: boolean = false, action: AnyAction) {
  switch (action.type) {
    case TodoActionType.FETCH_TODOS:
      return true;
    case TodoActionType.FETCH_TODOS_FULFILLED:
      return false;
    default:
      return state;
  }
}

export const actionCreators = {
  fetchTodos
};

export const reducers = {
  todos: todosReducer,
  isProcessing: isProcessingReducer
};

export const rootEpic = combineEpics(fetchTodosEpic);
