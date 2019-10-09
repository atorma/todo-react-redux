import Rx from 'rxjs';
import { Action, AnyAction } from 'redux';
import { ofType } from 'redux-observable';
import * as Operators from 'rxjs/operators';
import { combineEpics } from 'redux-observable';
import { Todo } from '../types';

enum TodoActionType {
  FETCH_TODOS = 'FETCH_TODOS',
  FETCH_TODOS_FULFILLED = 'FETCH_TODOS_FULFILLED'
}

const mockTodos: Todo[] = [{ id: '0', title: 'Todo 0' }, { id: '1', title: 'Todo 1' }];

function fetchTodos() {
  return { type: TodoActionType.FETCH_TODOS };
}
function fetchTodosFulfilled(todos: Todo[]) {
  return { type: TodoActionType.FETCH_TODOS_FULFILLED, todos };
}

const fetchTodosEpic = (action$: Rx.Observable<Action>) =>
  action$.pipe(
    ofType(TodoActionType.FETCH_TODOS),
    Operators.delay(1000),
    Operators.mapTo(fetchTodosFulfilled(mockTodos))
  );

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
