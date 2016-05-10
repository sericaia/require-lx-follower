export default {
  'github':
  {
    'apiUrl': 'https://api.github.com',
    'issues':  '${api}/repos/${roomId}/issues?per_page=${limit}',
    'resultsField': 'data'
  },
  'meetup': {
    'apiUrl': 'https://api.meetup.com',
    'events': '${api}/2/events?group_urlname=${roomId}&page=${limit}',
    'resultsField': 'data.results'
  }
};
