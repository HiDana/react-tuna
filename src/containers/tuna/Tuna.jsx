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
  constructor(props) {
    super(props);
    this.state = {
      fishInfo: null,
      newFishInfo: null
    };
  }

  get_fishInfo = detail => {
    this.setState({ fishInfo: detail });
  };
  get_newFishInfo = newInfo => {
    this.setState({ newFishInfo: newInfo });
  };
  render() {
    const { fishInfo, newFishInfo } = this.state;
    return (
      <div id="tuna">
        <Header cb_newFishInfo={this.get_newFishInfo} />
        <div className="tuna_body">
          <Fish cb_fishInfo={this.get_fishInfo} newFishInfo={newFishInfo} />
          <FishInfo fishInfo={fishInfo} />
        </div>
      </div>
    );
  }
}

export default Tuna;
