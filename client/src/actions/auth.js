import { DISPLAY_MODAL, LOGIN_SUCCESS, USER_LOADED, AUTH_ERROR } from "./types";
import axios from "axios";
import set_auth_token from "../utils/set_auth_token";

export const load_active_user = () => async (dispatch) => {

  if (localStorage.token) {
    set_auth_token(localStorage.token);
  }

  try {
    
    const res = await axios.get("/api/auth/load_active_user");

    console.log(res.data);
  } catch (error) {
    console.log(error);
  }

  // try {

  //   const res = await axios.get("/api/auth/load_active_user");

  //   console.log(res);

  //   dispatch({
  //     type: USER_LOADED,
  //     payload: res.data,
  //   });
  // } catch (error) {
  //   console.log(error);
  //   dispatch({
  //     type: AUTH_ERROR,
  //   });
  // }
};

export const login_user = (form_data, history) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  let request_body = JSON.stringify(form_data);

  try {
    const res = await axios.post("/api/auth/login", request_body, config);

    if (res.data.error) {
      dispatch({
        type: DISPLAY_MODAL,
        payload: {
          modal_title: "Error",
          modal_body: "Unable to login",
          modal_confirmation: "Ok",
        },
      });
    } else {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });

      dispatch({
        type: DISPLAY_MODAL,
        payload: {
          modal_title: "Success",
          modal_body: "Login Successful",
          modal_confirmation: "Ok",
        },
      });

      history.push("/");
    }
  } catch (error) {
    dispatch({
      type: DISPLAY_MODAL,
      payload: {
        modal_title: "Error",
        modal_body: "Unable to login",
        modal_confirmation: "Ok",
      },
    });
  }
};

export const register_user = (form_data, history) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  let request_body = JSON.stringify(form_data);

  try {
    const res = await axios.post("/api/auth/register", request_body, config);

    if (res.data.error) {
      dispatch({
        type: DISPLAY_MODAL,
        payload: {
          modal_title: "Error",
          modal_body: res.data.message,
          modal_confirmation: "Ok",
        },
      });
    } else {
      history.push("/login");
      dispatch({
        type: DISPLAY_MODAL,
        payload: {
          modal_title: "Success",
          modal_body: res.data.message,
          modal_confirmation: "Ok",
        },
      });
    }
  } catch (error) {
    dispatch({
      type: DISPLAY_MODAL,
      payload: {
        modal_title: "Error",
        modal_body: "Unable to complete registration",
        modal_confirmation: "Ok",
      },
    });
  }
};
