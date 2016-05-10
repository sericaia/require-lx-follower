'use strict';

import getValue from 'get-value';
import Immutable from 'immutable';
import moment from 'moment';

import * as types from '../actions/actionTypes';
import apiData from '../assets/apiData';

const initialState = new Immutable.List();

export default function fetcher(state = initialState, action = {}) {

    function parseMessage(provider, currentState, message) {

      var parse = {
        github: {
         id: state.size,
         title: message.title,
         state: message.state,
         createdAt: moment(message.created_At).format('MMM Do YYYY'),
         url: message.html_url,
         provider,
        },
        meetup: {
         id: state.size,
         title: message.name,
         state: message.status,
         date: moment(message.time).format('MMM Do YYYY'),
         url: message.event_url,
         provider
       }
     };

      return currentState.push(parse[provider]);
    }

    if(action.type === types.RECEIVE_MESSAGES) {
      var resultsField = apiData[action.provider].resultsField;
      return getValue(action, resultsField).reduce(function(currentState, message) {
        return parseMessage(action.provider, currentState, message);
      }, state);
    } else {
      return state;
    }
}
