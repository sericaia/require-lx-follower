'use strict';

const logMiddleware = store => next => action => {
  console.log('>>> Action:');
  console.log(action);
  console.log('>>> Store:');
  console.log(store);
  return next(action);
};

export default logMiddleware;
