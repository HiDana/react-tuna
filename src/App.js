import React, { Component } from "react";
import { Route } from "react-router-dom";

import Redux from "./components/redux";
import RouteA from "./components/routeA";
import RouteB from "./components/routeB";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route exact path="/" component={Redux} />
        <Route path="/routeA" component={RouteA} />
        <Route path="/routeB" component={RouteB} />
      </div>
    );
  }
}

export default App;
