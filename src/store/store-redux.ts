import { combineEpics } from 'redux-observable';
import { combineReducers } from 'redux';

import { rootEpic as todoRootEpic, reducers as todoReducers } from '../todos/todos-redux';

export const rootEpic = combineEpics(todoRootEpic);
export const rootReducer = combineReducers(Object.assign(todoReducers));
