import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import "./scss/index.scss";

// redux
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { ConnectedRouter, routerMiddleware } from "react-router-redux";
import reducers from "./reducers";

const store = createStore(reducers, applyMiddleware());

//router
// import createHistory from "history/createBrowserHistory";
// const history = createHistory();
// const middleware = routerMiddleware(history);
// const store = createStore(reducers, applyMiddleware(middleware));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
