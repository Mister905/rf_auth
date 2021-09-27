import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  USER_LOADED,
  AUTH_ERROR,
} from "../actions/types";

const initial_state = {
  token: localStorage.getItem("token"),
  is_authenticated: false,
  loading_user: true,
  user: null,
};

export default function(state = initial_state, action) {
  const { type, payload } = action;

  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        is_authenticated: true,
        loading_user: false,
        user: payload,
      };
    case LOGIN_SUCCESS:
      const { token } = payload;
      localStorage.setItem("token", token);
      return {
        ...state,
        token,
        is_authenticated: true,
      };
    case LOGIN_FAIL:
    case AUTH_ERROR:
    case LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        is_authenticated: false,
        user: null,
        loading_user: true,
      };
    default:
      return state;
  }
}
