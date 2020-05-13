import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import { composeWithDevTools } from 'redux-devtools-extension';

import history from './history';
import reducers from './reducers';
import thunk from 'redux-thunk';

const middleware = routerMiddleware(history);
const middlewares = [middleware, thunk];
const store = createStore(reducers, composeWithDevTools(applyMiddleware(...middlewares)));

export default store;