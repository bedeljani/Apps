
import logger  from 'redux-logger';
import promise from 'redux-promise-middleware';


const middlewares = [];

if (__DEV__) {
  middlewares.push(logger);
}

middlewares.push(promise)

export default middlewares;