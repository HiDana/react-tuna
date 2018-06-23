import React, { Component } from "react";
// import { Input } from "antd";
import "../../style/main.css";
//components
import Header from "../../components/header/Header";
import Fish from "../../components/fish/Fish";
import FishInfo from "../../components/fishInfo/FishInfo";
//images
// import img_map from "../../images/map.png";
// import img_map2 from "../../images/map2.jpg";

class Tuna extends Component {
  render() {
    return (
      <div id="tuna">
        <Header />
        <div className="tuna_body">
          <Fish />
          <FishInfo />
        </div>
      </div>
    );
  }
}

export default Tuna;
