import { TEST } from "./types";

export function sendTestAction(d: boolean) {
  return {
    type: TEST,
    payload: d
  };
}
