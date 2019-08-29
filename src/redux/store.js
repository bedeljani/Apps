import { createStore, applyMiddleware } from 'redux';

import logger from "redux-logger";
import promise from "redux-promise-middleware";

import middlewares from './middleware';
import appReducer from './reducers';

const store = createStore(appReducer, applyMiddleware(logger, promise))

export { store };
