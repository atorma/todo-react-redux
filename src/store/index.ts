import { createStore, applyMiddleware, Store } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';
import { rootEpic, rootReducer } from './store-redux';

const epicMiddleware = createEpicMiddleware();
const store: Store = createStore(rootReducer, composeWithDevTools(applyMiddleware(epicMiddleware)));
epicMiddleware.run(rootEpic);

export default store;
