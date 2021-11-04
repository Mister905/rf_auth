import {
  GET_PRODUCT,
  GET_PRODUCTS,
  CLEAR_PRODUCTS,
  DISPLAY_MODAL,
  CLEAR_PRODUCT,
  DELETE_PRODUCT,
} from "./types";

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

export const clear_product = () => async (dispatch) => {
  try {
    dispatch({
      type: CLEAR_PRODUCT,
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

    console.log(res);

    if (res.data.error) {
      dispatch({
        type: DISPLAY_MODAL,
        payload: {
          modal_title: "Product Creation Error",
          modal_body: res.data.message,
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
    console.log("TEST");
    console.log(error);
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
          modal_body: "Unable to update product",
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
    if (res.data.error) {
      dispatch({
        type: DISPLAY_MODAL,
        payload: {
          modal_title: "Error",
          modal_body: "Unable to update product",
          modal_confirmation: "Ok",
        },
      });
    } else {
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

export const delete_product = (product_id) => async (dispatch) => {
  try {
    const res = await instance.delete(`/products/${product_id}`);
    dispatch({
      type: DELETE_PRODUCT,
    });
    dispatch({
      type: DISPLAY_MODAL,
      payload: {
        modal_title: "Success",
        modal_body: "Product successfuly deleted",
        modal_confirmation: "OK",
      },
    });
  } catch (error) {
    dispatch({
      type: DISPLAY_MODAL,
      payload: {
        modal_title: "Error",
        modal_body: "Unable to delete product",
        modal_confirmation: "Ok",
      },
    });
  }
};
