import { GET_PRODUCT, GET_PRODUCTS, CLEAR_PRODUCTS, DISPLAY_MODAL } from "./types";

import instance from "../utils/axios";

export const get_products = () => async (dispatch) => {
  try {
    const res = await instance.get("/products");

    dispatch({
      type: GET_PRODUCTS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: DISPLAY_MODAL,
      payload: {
        modal_title: "Error",
        modal_body: "Unable to fetch products",
        modal_confirmation: "Close",
      },
    });
  }
};

export const get_product = (id) => async (dispatch) => {
  try {
    const res = await instance.get(`/products/${id}`);

    dispatch({
      type: GET_PRODUCT,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: DISPLAY_MODAL,
      payload: {
        modal_title: "Error",
        modal_body: "Unable to fetch product",
        modal_confirmation: "Close",
      },
    });
  }
};

export const clear_products = () => async (dispatch) => {
  try {
    dispatch({
      type: CLEAR_PRODUCTS,
    });
  } catch (error) {
    console.log(error);
  }
};

export const create_product = (form_data, history) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  let request_body = JSON.stringify(form_data);

  try {
    const res = await instance.post("/products", request_body, config);

    if (res.data.error) {
      dispatch({
        type: DISPLAY_MODAL,
        payload: {
          modal_title: "Error",
          modal_body: "Unable to create product",
          modal_confirmation: "Ok",
        },
      });
    } else {
      dispatch({
        type: DISPLAY_MODAL,
        payload: {
          modal_title: "Success",
          modal_body: "Product created",
          modal_confirmation: "Ok",
        },
      });
      history.push("/products");
    }
  } catch (error) {
    dispatch({
      type: DISPLAY_MODAL,
      payload: {
        modal_title: "Error",
        modal_body: "Unable to create product",
        modal_confirmation: "Ok",
      },
    });
  }
};

export const update_product = (form_data, history) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  let request_body = JSON.stringify(form_data);

  try {
    const res = await instance.put("/products", request_body, config);

    if (res.data.error) {
      dispatch({
        type: DISPLAY_MODAL,
        payload: {
          modal_title: "Error",
          modal_body: "Unable to create product",
          modal_confirmation: "Ok",
        },
      });
    } else {
      dispatch({
        type: DISPLAY_MODAL,
        payload: {
          modal_title: "Success",
          modal_body: "Product updated",
          modal_confirmation: "Ok",
        },
      });
      history.push("/products");
    }
  } catch (error) {
    dispatch({
      type: DISPLAY_MODAL,
      payload: {
        modal_title: "Error",
        modal_body: "Unable to update product",
        modal_confirmation: "Ok",
      },
    });
  }
};
