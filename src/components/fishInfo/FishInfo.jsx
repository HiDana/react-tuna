import React, { Component } from "react";
import axios from "axios";
import { Icon, Input, Select, Button } from "antd";
import { config } from "../../config";
import "../../style/main.css";

const Option = Select.Option;

class FishInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userRole: localStorage.userRole,
      edit_status: false,
      editFishInfo: {}
    };
  }
  infoStatus(detail) {
    return (
      <div>
        <div className="info_subset timeStamp">
          <p>{detail.timestamp}</p>
        </div>
        <div className="info_subset">
          <h1>{detail.key}</h1>
        </div>
        <div className="info_subset">
          <h4>捕撈位置 <span>{detail.location}</span></h4>
        </div>
        <div className="info_subset">
          <h4>擁有者 <span>{detail.holder}</span></h4>
        </div>
        <div className="info_subset">
          <h4>捕撈船 <span>{detail.vessel}</span></h4>
        </div>
      </div>
    );
  }
  editStatus = detail => {
    const { editFishInfo } = this.state;

    return (
      <div className="editStatus">
        <div className="info_subset timeStamp">
          <Input
            placeholder="捕撈時間"
            defaultValue={detail.timestamp}
            onChange={e =>
              this.setState({
                editFishInfo: { ...editFishInfo, timestamp: e.target.value }
              })}
          />
          {/* TODO time change to time picker */}
        </div>
        <div className="info_subset">
          <h1>{detail.key}</h1>
        </div>
        <div className="info_subset">
          <Select
            showSearch
            style={{ width: 200 }}
            placeholder="捕撈位置"
            defaultValue={detail.location}
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0}
            onChange={e =>
              this.setState({
                editFishInfo: { ...editFishInfo, location: e }
              })}
          >
            <Option value="太平洋">太平洋</Option>
            <Option value="大西洋">大西洋</Option>
            <Option value="印度洋">印度洋</Option>
            <Option value="北冰洋">北冰洋</Option>
            <Option value="南冰洋">南冰洋</Option>
            <Option value="其他">其他</Option>
          </Select>
        </div>
        <div className="info_subset">
          <Input
            placeholder="擁有者"
            defaultValue={detail.holder}
            onChange={e =>
              this.setState({
                editFishInfo: { ...editFishInfo, holder: e.target.value }
              })}
          />
        </div>
        <div className="info_subset">
          <Input
            placeholder="擁有者"
            defaultValue={detail.vessel}
            onChange={e =>
              this.setState({
                editFishInfo: { ...editFishInfo, vessel: e.target.value }
              })}
          />
        </div>
        <div className="renew">
          <Button
            ghost
            onClick={() => this.updateFishinfo({ ...detail, ...editFishInfo })}
          >
            更新
          </Button>
        </div>
      </div>
    );
  };
  updateFishinfo = newEditFishInfo => {
    const { edit_status } = this.state;
    // console.log("newEditFishInfo", newEditFishInfo);

    axios
      .put(`${config.apiURL}/tuna?key=${newEditFishInfo.key}`, newEditFishInfo)
      .then(res => {
        if (res.data === "v_putTuna") {
          console.log("[成功修正一條魚資訊]");
          this.props.cb_newEditFishInfo(newEditFishInfo);
          this.setState({ edit_status: !edit_status });
        }
      })
      .catch(error => {
        console.log(error);
      });

    // this.props.cb_newEditFishInfo(newEditFishInfo);
    // this.setState({ edit_status: !edit_status });
  };

  render() {
    const { fishInfo } = this.props;
    const { userRole, edit_status } = this.state;

    if (!fishInfo) return null;

    if (fishInfo.data.name) {
      const fish_detail = fishInfo.data.detail;

      return (
        <div id="fishInfo">
          {userRole === "admin"
            ? <div
                className={edit_status ? "info_edit-click" : "info_edit"}
                onClick={() => this.setState({ edit_status: !edit_status })}
              >
                <Icon type="edit" />
              </div>
            : null}

          {edit_status
            ? this.editStatus(fish_detail)
            : this.infoStatus(fish_detail)}
        </div>
      );
    } else {
      return null;
    }
  }
}

export default FishInfo;
