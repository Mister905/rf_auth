import { DISPLAY_MODAL, CLOSE_MODAL } from "../actions/types";

const initial_state = {
  display_modal: false,
  modal_title: "",
  modal_body: "",
  modal_confirmation: "",
  modal_decline: "",
};

export default function(state = initial_state, action) {
  const { type, payload } = action;

  switch (action.type) {
    case DISPLAY_MODAL:
      return {
        ...state,
        display_modal: true,
        modal_title: payload.modal_title,
        modal_body: payload.modal_body,
        modal_confirmation: payload.modal_confirmation,
        modal_decline: payload.modal_decline,
      };
    case CLOSE_MODAL:
      return {
        ...state,
        display_modal: false,
        modal_title: "",
        modal_body: "",
        modal_confirmation: "",
        modal_decline: "",
      };
    default:
      return state;
  }
}
