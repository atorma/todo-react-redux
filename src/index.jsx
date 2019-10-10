import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import configureStore from './store';

const store = configureStore();
render(App);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

// https://medium.com/@brianhan/hot-reloading-cra-without-eject-b54af352c642
if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default;
    render(NextApp);
  });
}

function render(App) {
  return ReactDOM.render(
    <Provider store={store}>
      <React.Fragment>
        <CssBaseline />
        <App />
      </React.Fragment>
    </Provider>,
    document.getElementById('root')
  );
}
