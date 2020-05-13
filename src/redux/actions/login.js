import api from '../../services/api';
import * as types from '../actions_types/login';

const loginStart = { type: types.LOGIN_START };
const loginSuccess = json => { return { type: types.LOGIN_SUCCESS, payload: json.response } };
const loginFaild = { type: types.LOGIN_FAILD };

export const login = (form) => {
  return dispatch => {
    dispatch(loginStart);
    return api.post('/login', form)
      .then(json => {
        dispatch(loginSuccess(json));
        return json;
      })
      .catch(ex => {
        dispatch(loginFaild);
        throw ex;
      })
  };
};