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

function receiveMessages(content, jsonData) {
  return {
    type: types.RECEIVE_MESSAGES,
    content,
    data: jsonData,
    receivedAt: Date.now()
  };
}

export function fetchMessages(content, limit) {
  return dispatch => {
    dispatch(requestMessages(content));

    return api.getMessages(content, limit)
      .then(json => {

        return dispatch(receiveMessages(content, json));
      })
      .catch((error) => handleActionError(dispatch, error, content));
  };
}
