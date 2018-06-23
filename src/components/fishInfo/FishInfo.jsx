import React, { Component } from "react";
import "../../style/main.css";
const data_fishInfo = {
  Key: "我是魚",
  vessel: "永和號", //輪
  timestamp: "20180604",
  location: "太平洋",
  holder: "大禹"
};
class FishInfo extends Component {
  render() {
    return (
      <div id="fishInfo">
        <div className="info_subset timeStamp">
          <p>{data_fishInfo.timestamp}</p>
        </div>
        <div className="info_subset">
          <h1>{data_fishInfo.Key}</h1>
        </div>
        <div className="info_subset">
          <h4>捕撈位置 <span>{data_fishInfo.location}</span></h4>
        </div>
        <div className="info_subset">
          <h4>擁有者 <span>{data_fishInfo.holder}</span></h4>
        </div>
      </div>
    );
  }
}

export default FishInfo;
