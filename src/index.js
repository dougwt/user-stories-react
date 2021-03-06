import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Router, browserHistory } from 'react-router';
import reduxPromise from 'redux-promise';
import reduxThunk from 'redux-thunk';
import createLogger from 'redux-logger';

import routes from './routes';
import reducers from './reducers';
import { AUTH_SIGNIN } from './actions/types';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

const reduxLogger = createLogger();
const createStoreWithMiddleware = applyMiddleware(
  reduxPromise,
  reduxThunk,
  reduxLogger
)(createStore);
const store = createStoreWithMiddleware(reducers, composeWithDevTools());

const token = localStorage.getItem('token');
// If we have a token, consider the user to be signed in.
if (token) {
  // we need to update application state
  store.dispatch({ type: AUTH_SIGNIN });
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  document.getElementById('root')
);
