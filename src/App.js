import React, { Component } from "react";
import { Route } from "react-router-dom";
import "antd/dist/antd.css";

import Tuna from "./containers/tuna/Tuna";
import User from "./containers/user/User";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route exact path="/" component={Tuna} />
        <Route path="/login" component={User} />
      </div>
    );
  }
}

export default App;
