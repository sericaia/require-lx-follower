'use strict';

import * as types from './actionTypes';
import api from '../utils/api';
import handleActionError from '../utils/handleActionError';

export function selectMessages(content) {
  return {
    type: types.SELECT_MESSAGES,
    content
  };
}

function requestMessages(content) {
  return {
    type: types.REQUEST_MESSAGES,
    content  };
}

function receiveMessages(provider, content, jsonData) {
  return {
    provider,
    type: types.RECEIVE_MESSAGES,
    content,
    data: jsonData,
    receivedAt: Date.now()
  };
}

export function fetchMessages(provider, content, limit) {
  return dispatch => {
    dispatch(requestMessages(content));

    return api.getMessages(provider, content, limit)
      .then(json => {

        return dispatch(receiveMessages(provider, content, json));
      })
      .catch((error) => handleActionError(dispatch, error, content));
  };
}
