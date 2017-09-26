import React, { Component } from "react";
import { Link } from "react-router-dom";

class RouterB extends Component {
  render() {
    return (
      <div>
        RouterB
        <br />
        <Link to={`/routeA`}>
          to routeA
        </Link>
      </div>
    );
  }
}

export default RouterB;
