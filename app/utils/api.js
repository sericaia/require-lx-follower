'use strict';

import fetch from 'isomorphic-fetch';
import processResponse from './processResponse';

const GITHUB_API = 'https://api.github.com';

var api = {
  getMessages(roomId, limit) {
    roomId = roomId.toLowerCase().trim();

    var url = `${GITHUB_API}/repos/${roomId}/issues?per_page=${limit}`;

    return fetch(url).then(processResponse);
  }

};

export default api;
