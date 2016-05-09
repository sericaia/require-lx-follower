'use strict';

import * as types from '../actions/actionTypes';
import Immutable from 'immutable';

const initialState = new Immutable.List();

export default function fetcher(state = initialState, action = {}) {

    function parseMessage(message) {
      var msg = {
       id: state.size,
       title: message.title,
       state: message.state,
       updatedAt: message.updated_at
    };

      return state.push(msg);
    }

    if(action.type === types.RECEIVE_MESSAGES) {
      var _state = action.data.map(message => parseMessage(message));
      return _state;
    } else {
      return state;
    }
}
