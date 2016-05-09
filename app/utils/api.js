'use strict';

import fetch from 'isomorphic-fetch';
import processResponse from './processResponse';

const GITHUB_API = 'https://api.github.com';

var api = {
  getMessages(roomId) {
    roomId = roomId.toLowerCase().trim();

    var url = `${GITHUB_API}/repos/${roomId}/issues`;

    return fetch(url).then(processResponse);
  }

};

export default api;
