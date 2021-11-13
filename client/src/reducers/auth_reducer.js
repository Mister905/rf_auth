import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  USER_LOADED
} from "../actions/types";

const initial_state = {
  access_token: localStorage.getItem("token"),
  is_authenticated: false,
  loading_user: true,
  user: null,
};

export default function (state = initial_state, action) {
  const { type, payload } = action;

  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        is_authenticated: true,
        loading_user: false,
        user: payload.user,
      };
    case LOGIN_SUCCESS:
      localStorage.setItem("token", payload.access_token);
      return {
        ...state,
        access_token: payload.access_token,
        is_authenticated: true,
        loading_user: false,
        user: payload.user,
      };
    case LOGIN_FAIL:
    case LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        access_token: null,
        is_authenticated: false,
        user: null,
        loading_user: true,
      };
    default:
      return state;
  }
}
