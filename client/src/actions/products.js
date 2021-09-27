import { GET_PRODUCTS } from "./types";
import axios from "axios";

export const get_products = (history) => async (dispatch) => {
  try {
    const res = await axios.get("/api/products");

    console.log(res.data);
    // dispatch({
    //     type: LOGIN_USER,
    //     payload: res.data
    // });
    // history.push("/");
    // dispatch(create_alert("success", "Welcome Back"));
  } catch (error) {
    console.log(error);
    // dispatch(create_alert("error", "Login Error"));
  }
};
