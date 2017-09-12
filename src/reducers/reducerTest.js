import { TEST } from "../actions/types";

export default function(state = false, action) {
  switch (action.type) {
    case TEST:
      return action.payload;
    default:
      return state;
  }
}
