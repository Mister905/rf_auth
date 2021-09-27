import { TIME_LOADED } from "../actions/types";

const initial_state = {
  current_time_est: null,
};

// Use the initial_state as a default value
export default function(state = initial_state, action) {
  const { type, payload } = action;
  switch (action.type) {
    case TIME_LOADED:
      return {
        ...state,
        current_time_est: payload,
      };
    default:
      // If this reducer doesn't recognize the action type, or doesn't
      // care about this specific action, return the existing state unchanged
      return state;
  }
}
