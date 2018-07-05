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
      newFishInfo: null,
      searchIndex: null,
      newEditFishInfo: null
    };
  }

  get_fishInfo = detail => {
    this.setState({ fishInfo: detail });
  };
  get_newFishInfo = newInfo => {
    console.log("[新增一條魚 - Tuns(父) 準備轉發到 Fish(子)]", newInfo);
    this.setState({ newFishInfo: newInfo });
  };
  search_fishIndex = (i, data) => {
    console.log(i, data);
    this.setState({ searchIndex: i, fishInfo: { data: data } });
  };
  newEdit_fishInfo = newEditFishInfo => {
    this.setState({ newEditFishInfo });
  };
  render() {
    const { fishInfo, newFishInfo, searchIndex, newEditFishInfo } = this.state;
    return (
      <div id="tuna">
        <Header
          cb_newFishInfo={this.get_newFishInfo}
          cb_searchIndex={this.search_fishIndex}
          newEditFishInfo={newEditFishInfo}
        />
        <div className="tuna_body">
          <Fish
            cb_fishInfo={this.get_fishInfo}
            newFishInfo={newFishInfo}
            searchIndex={searchIndex}
            newEditFishInfo={newEditFishInfo}
          />
          <FishInfo
            fishInfo={fishInfo}
            cb_newEditFishInfo={this.newEdit_fishInfo}
          />
        </div>
      </div>
    );
  }
}

export default Tuna;
