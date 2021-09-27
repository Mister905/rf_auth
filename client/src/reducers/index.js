import { combineReducers } from "redux";
import products_reducer from "./products_reducer";
import modal_reducer from "./modal_reducer";
import auth_reducer from "./auth_reducer";

export default combineReducers({
  products: products_reducer,
  modal: modal_reducer,
  auth: auth_reducer,
});
