import React, { Component } from 'react-native';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import thunk from 'redux-thunk';
import logMiddleware from '../middleware/logMiddleware';

import * as reducers from '../reducers';
import Follower from '../components/app';

var middleware = [ thunk, logMiddleware ];
const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore);
const reducer = combineReducers(reducers);
const store = createStoreWithMiddleware(reducer);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Follower />
      </Provider>
    );
  }
}
