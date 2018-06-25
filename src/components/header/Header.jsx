import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Icon, Input, Button, Radio, Select, DatePicker } from "antd";
import moment from "moment";
import "../../style/main.css";
//images
import img_logo from "../../images/logo.png";
//fake data
import fakeTunaData from "../fish/data/testData.json";

const Search = Input.Search;
const Option = Select.Option;

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userRole: "admin",
      btnStatus: { add: false, search: false, addUser: false },
      tunaData: fakeTunaData,
      newFishInfo: {
        key: 99,
        vessel: null,
        timestamp: moment().format("YYYYMMDD"),
        moment: moment(),
        location: "太平洋",
        holder: null
      }
    };
  }

  add_newFish = () => {
    const { newFishInfo } = this.state;
    delete newFishInfo.moment;
    console.log("newFishInfo", newFishInfo);

    this.props.cb_newFishInfo(newFishInfo);
    this.setState({
      newFishInfo: {
        vessel: null,
        timestamp: moment().format("YYYYMMDD"),
        moment: moment(),
        location: "太平洋",
        holder: null
      }
    });
  };
  add_newUser() {}

  search(data) {
    const { tunaData } = this.state;
    // console.log("data", data);
    const nodes = tunaData.nodes;
    nodes.filter((node, i) => {
      if (node.detail.key === data) {
        // console.log(i);
        this.props.cb_searchIndex(i, node);
      }
    });
  }

  render() {
    const { userRole, btnStatus, newFishInfo } = this.state;

    return (
      <div id="header">
        <div className="header-left">
          <div className="logo">
            <Link to={`/`}>
              <img src={img_logo} alt="logo" />
            </Link>
          </div>
          <div className="tuna-operating">

            <div className="tuna_btn_block">
              <div
                className="tuna-add tuna-btn"
                onClick={() =>
                  this.setState({
                    btnStatus: {
                      add: !btnStatus.add,
                      search: false,
                      addUser: false
                    }
                  })}
              >
                <span>新增 <Icon type="plus" /></span>
              </div>
              <div className={btnStatus.add ? "tuna_card-open" : "tuna_card"}>
                <div className="tuna_card-inner">
                  <Input
                    placeholder="輸入 姓名"
                    value={newFishInfo.holder}
                    onChange={e =>
                      this.setState({
                        newFishInfo: { ...newFishInfo, holder: e.target.value }
                      })}
                  />
                  <Input
                    placeholder="輸入 船名"
                    value={newFishInfo.vessel}
                    onChange={e =>
                      this.setState({
                        newFishInfo: { ...newFishInfo, vessel: e.target.value }
                      })}
                  />
                  <Select
                    showSearch
                    placeholder="選擇 捕撈位置"
                    value={newFishInfo.location}
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option.props.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0}
                    onChange={e =>
                      this.setState({
                        newFishInfo: { ...newFishInfo, location: e }
                      })}
                  >
                    <Option value="太平洋">太平洋</Option>
                    <Option value="大西洋">大西洋</Option>
                    <Option value="印度洋">印度洋</Option>
                    <Option value="北冰洋">北冰洋</Option>
                    <Option value="南冰洋">南冰洋</Option>
                    <Option value="其他">其他</Option>
                  </Select>

                  <DatePicker
                    placeholder="選擇 捕撈時間"
                    value={newFishInfo.moment}
                    format={"YYYYMMDD"}
                    onChange={(moment, e) => {
                      this.setState({
                        newFishInfo: { ...newFishInfo, moment, timestamp: e }
                      });
                    }}
                  />

                  <Button
                    type="primary"
                    className="tuna-btn-add"
                    onClick={this.add_newFish}
                  >
                    新增
                  </Button>
                </div>
              </div>
            </div>

            <div className="tuna_btn_block">
              <div
                className="tuna-search tuna-btn"
                onClick={() =>
                  this.setState({
                    btnStatus: {
                      add: false,
                      search: !btnStatus.search,
                      addUser: false
                    }
                  })}
              >
                <span>搜尋 <Icon type="search" /></span>
              </div>
              <div
                className={btnStatus.search ? "tuna_card-open" : "tuna_card"}
              >
                <div className="tuna_card-inner">
                  <Search
                    placeholder="輸入 搜尋編號"
                    onSearch={value => this.search(value)}
                    enterButton
                  />
                </div>
              </div>
            </div>

            {userRole === "admin"
              ? <div className="tuna_btn_block">
                  <div
                    className="tuna-addUser tuna-btn"
                    onClick={() =>
                      this.setState({
                        btnStatus: {
                          add: false,
                          search: false,
                          addUser: !btnStatus.addUser
                        }
                      })}
                  >
                    <span>新增使用者 <Icon type="user-add" /></span>
                  </div>
                  <div
                    className={
                      btnStatus.addUser ? "tuna_card-open" : "tuna_card"
                    }
                  >
                    <div className="tuna_card-inner">
                      <Input placeholder="輸入 新使用者名稱" />
                      <Button
                        type="primary"
                        className="tuna-btn-add"
                        onClick={this.add_newUser}
                      >
                        新增
                      </Button>

                    </div>
                  </div>
                </div>
              : null}
          </div>
        </div>
        <div className="header-right">
          <div className="user_info">
            <div className="user_role">管理者</div>
            <div className="user_name">Dana</div>
          </div>
          <div className="sign-out">
            <div className="tuna_btn_block">
              <div className="tuna-btn">
                <Link to={`/login`}>
                  登出
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
