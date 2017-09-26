import React, { Component } from "react";
import { Link } from "react-router-dom";

class RouteA extends Component {
  render() {
    return (
      <div>

        RouteA
        <br />
        <Link to={`/routeB`}>
          to routeB
        </Link>
        <br />
        <Link to={`/`}>
          to home(redux)
        </Link>

      </div>
    );
  }
}

export default RouteA;
