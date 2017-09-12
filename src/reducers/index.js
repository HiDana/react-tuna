import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import reducerTest from "./reducerTest";

const rootReducer = combineReducers({
  reduxTest: reducerTest,
  router: routerReducer
});

export default rootReducer;
