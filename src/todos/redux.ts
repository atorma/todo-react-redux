import Rx from 'rxjs';
import { Action, AnyAction } from 'redux';
import { ofType } from 'redux-observable';
import * as Operators from 'rxjs/operators';
import { combineEpics } from 'redux-observable';
import { combineReducers } from 'redux';

export interface Todo {
  id: number;
  title: string;
}

enum TodoActionType {
  FETCH_TODOS = 'FETCH_TODOS',
  FETCH_TODOS_FULFILLED = 'FETCH_TODOS_FULFILLED'
}

interface TodoState {
  todos: Todo[];
  isProcessing: boolean;
}
const defaultState: TodoState = {
  isProcessing: false,
  todos: []
};

const mockTodos: Todo[] = [{ id: 0, title: 'Todo 0' }, { id: 0, title: 'Todo 1' }];

class FetchTodosAction implements Action<TodoActionType> {
  readonly type: TodoActionType = TodoActionType.FETCH_TODOS;
}
class FetchTodosFulfilledAction implements Action<TodoActionType> {
  readonly type: TodoActionType = TodoActionType.FETCH_TODOS_FULFILLED;
  todos: Todo[];

  constructor(todos: Todo[]) {
    this.todos = todos;
  }
}

function fetchTodos(): FetchTodosAction {
  return new FetchTodosAction();
}
function fetchTodosFulfilled(todos: Todo[]): FetchTodosFulfilledAction {
  return new FetchTodosFulfilledAction(todos);
}

export const actions = {
  fetchTodos,
  fetchTodosFulfilled
};

const fetchTodosEpic = (action$: Rx.Observable<Action>) =>
  action$.pipe(
    ofType(TodoActionType.FETCH_TODOS),
    Operators.delay(1000),
    Operators.mapTo(fetchTodosFulfilled(mockTodos))
  );

export const rootEpic = combineEpics(fetchTodosEpic);

export function rootReducer(state: TodoState = defaultState, action: AnyAction) {
  switch (action.type) {
    case TodoActionType.FETCH_TODOS:
      return Object.assign({}, state, { isProcessing: true });
    case TodoActionType.FETCH_TODOS_FULFILLED:
      return Object.assign({}, state, { isProcessing: false, todos: action.todos });
    default:
      return state;
  }
}
