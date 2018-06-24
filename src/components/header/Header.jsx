import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Icon, Input, Button, Radio, Select } from "antd";
import "../../style/main.css";
//images
import img_logo from "../../images/logo.png";
const Search = Input.Search;
const Option = Select.Option;

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userRole: "admin"
    };
  }

  add_newFish = () => {
    const newFishInfo = {
      key: "22",
      vessel: "永和號",
      timestamp: "20180620",
      location: "太平洋",
      holder: "dada"
    };
    this.props.cb_newFishInfo(newFishInfo);
  };
  add_newUser() {}

  render() {
    const { userRole } = this.state;
    return (
      <div id="header">
        <div className="header-left">
          <div className="logo">
            <Link to={`/`}>
              <img src={img_logo} alt="logo" />
            </Link>
          </div>
          <div className="tuna-operating">
            <div className="tuna-add tuna-btn">
              <span>新增 <Icon type="plus" /></span>
              <div className="tuna_card">
                <div className="tuna_card-inner">
                  <Input placeholder="輸入 姓名" />
                  <Input placeholder="輸入 船名" />
                  {/* <Input placeholder="輸入 捕撈位置" /> */}
                  <Select
                    showSearch
                    style={{ width: 200 }}
                    placeholder="選擇 捕撈位置"
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
                  <Input placeholder="輸入 捕撈時間" />
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

            <div className="tuna-search tuna-btn">
              <span>搜尋 <Icon type="search" /></span>
              <div className="tuna_card">
                <div className="tuna_card-inner">
                  <Search
                    placeholder="輸入 搜尋編號"
                    onSearch={value => console.log(value)}
                    enterButton
                  />
                </div>
              </div>
            </div>

            {userRole === "admin"
              ? <div className="tuna-search tuna-btn">
                  <span>新增使用者 <Icon type="user-add" /></span>
                  <div className="tuna_card">
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
            <div className="tuna-btn">
              <Link to={`/login`}>
                登出
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
