import * as types from '../actions_types/login';

const initialState = {
  isFeathing: false,
  user: null
};

const subscribe = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.LOGIN_START:
      return { ...state, isFeathing: true };

    case types.LOGIN_SUCCESS:
      return { ...state, isFeathing: false, user: payload.user };

    case types.LOGIN_FAILD:
      return { ...state, isFeathing: false };

    default:
      return { ...state };
  };
};

export default subscribe;