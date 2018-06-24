import React, { Component } from "react";
import { Icon, Input, Select, Button } from "antd";
import "../../style/main.css";

const Option = Select.Option;

class FishInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit_status: false
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
      </div>
    );
  }
  editStatus(detail) {
    return (
      <div className="editStatus">
        <div className="info_subset timeStamp">
          <Input placeholder="捕撈時間" defaultValue={detail.timestamp} />
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
          >
            <Option value="pacificOcean">太平洋</Option>
            <Option value="atlanticOcean">大西洋</Option>
            <Option value="indianOcean">印度洋</Option>
            <Option value="arcticOcean">北冰洋</Option>
            <Option value="antarcticaOcean">南冰洋</Option>
            <Option value="other">其他</Option>
          </Select>
        </div>
        <div className="info_subset">
          <Input placeholder="擁有者" defaultValue={detail.holder} />
        </div>
        <div className="renew">
          <Button ghost onClick={() => this.updateFishinfo(detail)}>
            更新
          </Button>
        </div>
      </div>
    );
  }
  updateFishinfo = detail => {
    const { edit_status } = this.state;
    // console.log("detail", detail);

    this.setState({ edit_status: !edit_status });
  };

  render() {
    const { fishInfo } = this.props;
    const { edit_status } = this.state;
    if (!fishInfo) return <div>loading</div>;

    const fish_detail = fishInfo.data.detail;

    // console.log("render", fish_detail);
    return (
      <div id="fishInfo">
        <div
          className={edit_status ? "info_edit-click" : "info_edit"}
          onClick={() => this.setState({ edit_status: !edit_status })}
        >
          <Icon type="edit" />
        </div>
        {edit_status
          ? this.editStatus(fish_detail)
          : this.infoStatus(fish_detail)}
      </div>
    );
  }
}

export default FishInfo;
