import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';
import { rootEpic, rootReducer } from './store-redux';

function configureStore() {
  const epicMiddleware = createEpicMiddleware();
  const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(epicMiddleware)));
  epicMiddleware.run(rootEpic);

  if (process.env.NODE_ENV !== 'production') {
    if (module.hot) {
      module.hot.accept('./store-redux', () => {
        store.replaceReducer(rootReducer);
      });
    }
  }

  return store;
}

export default configureStore;
