'use strict';

import fetch from 'isomorphic-fetch';
import processResponse from './processResponse';
import apiData from '../assets/apiData';

var api = {
  github(roomId, limit) {
    var api = apiData.github.apiUrl;
    var url = apiData.github.issues
              .replace('${api}', api)
              .replace('${roomId}', roomId)
              .replace('${limit}', limit);

    return fetch(url).then(processResponse);
  },
  meetup(roomId, limit) {
    var api = apiData.meetup.apiUrl;
    var url = apiData.meetup.events
              .replace('${api}', api)
              .replace('${roomId}', roomId)
              .replace('${limit}', limit);

    return fetch(url).then(processResponse);
  },
  getMessages(provider, roomId, limit) {
    roomId = roomId.toLowerCase().trim();

    return this[provider](roomId, limit);
  }
};

export default api;
