import { DISPLAY_MODAL, CLOSE_MODAL } from "./types";
import axios from "axios";

export const display_modal =
  (modal_title, modal_body, modal_confirmation, modal_decline) =>
  async (dispatch) => {
    try {
      dispatch({
        type: DISPLAY_MODAL,
        payload: { modal_title, modal_body, modal_confirmation, modal_decline },
      });
    } catch (error) {
      console.log(error);
    }
  };

export const close_modal = () => async (dispatch) => {
  try {
    dispatch({
      type: CLOSE_MODAL,
    });
  } catch (error) {
    console.log(error);
  }
};
