import { combineEpics } from 'redux-observable';
import { combineReducers } from 'redux';

import { rootEpic as todoEpics, rootReducer as todoReducers } from '../todos/redux';

export const rootEpic = combineEpics(todoEpics);
export const rootReducer = combineReducers(Object.assign(todoReducers));
