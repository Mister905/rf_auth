import {
  GET_PRODUCT,
  GET_PRODUCTS,
  CLEAR_PRODUCTS,
  CLEAR_PRODUCT,
  DELETE_PRODUCT,
} from "../actions/types";

const initial_state = {
  product_list: null,
  loading_products: true,
  loading_product: true,
  product: null,
};

// Use the initial_state as a default value
export default function (state = initial_state, action) {
  const { type, payload } = action;
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...state,
        product_list: payload.product_list,
        loading_products: false,
      };
    case GET_PRODUCT:
      return {
        ...state,
        product: payload.product,
        loading_product: false,
      };
    case CLEAR_PRODUCTS:
      return {
        ...state,
        product_list: null,
        loading_products: true,
      };
    case CLEAR_PRODUCT:
      return {
        ...state,
        product: null,
        loading_product: true,
      };
    case DELETE_PRODUCT:
      return {
        ...state,
        product_list: null,
        loading_products: true,
      };
    default:
      return state;
  }
}
