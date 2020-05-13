import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import history from '../history';
import login from '../reducers/login';

export default combineReducers({
    router: connectRouter(history),
    login
});