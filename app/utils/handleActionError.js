'use strict';

import { INVALID_MESSAGES } from '../actions/actionTypes';

export default function handleActionError (dispatch, error, source) {
  return dispatch({
    type: INVALID_MESSAGES,
    source,
    payload: error
  });
}
