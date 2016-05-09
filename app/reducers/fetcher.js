'use strict';

import * as types from '../actions/actionTypes';
import Immutable from 'immutable';

const initialState = new Immutable.List();

export default function fetcher(state = initialState, action = {}) {

    function parseMessage(currentState, message) {
      var msg = {
       id: state.size,
       title: message.title,
       state: message.state,
       updatedAt: message.updated_at
    };

      return currentState.push(msg);
    }

    if(action.type === types.RECEIVE_MESSAGES) {
      return action.data.reduce(function(currentState, message) {
        return parseMessage(currentState, message);
      }, state);
    } else {
      return state;
    }
}
