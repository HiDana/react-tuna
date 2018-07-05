import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";
import axios from "axios";
import moment from "moment";
import { Icon, Input, Button, Radio, Select, DatePicker } from "antd";
import { config } from "../../config";
import "../../style/main.css";
//component
import { dialog } from "../../components/fn/fn";
//images
import img_logo from "../../images/logo.png";
//data
import initData from "../fish/data/initData.json";
import categories from "../fish/data/categories.json";
//fake data
// import fakeTunaData from "../fish/data/testData.json";

const Search = Input.Search;
const Option = Select.Option;

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: localStorage.userName,
      userRole: localStorage.userRole,
      btnStatus: { add: false, search: false, addUser: false },
      tunaData: null,
      newFishInfo: {
        vessel: null,
        timestamp: moment().format("YYYYMMDD"),
        moment: moment(),
        location: "太平洋",
        holder: null
      },
      newUserName: "",
      redirectToLogin: false,
      editFishInfo: null
    };
  }

  componentWillMount() {
    axios
      .get(`${config.apiURL}/tunas`, { withCredentials: true })
      .then(res => {
        if (res.status === 200) {
          console.log("[成功撈到很多隻魚]");
          console.log(res.data);
          const nodes = res.data.map(node => {
            const newNode = {
              name: node.key,
              detail: node,
              value: "",
              category: categories[node.location]
            };
            return newNode;
          });
          const tunaData = { ...initData, nodes };

          console.log("[重新 parser 魚的資料]");

          this.setState({ tunaData });
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  componentWillReceiveProps(nextProps) {
    const { tunaData } = this.state;
    const oldEditFishInfo = this.state.editFishInfo;
    const { newEditFishInfo } = nextProps;

    //監聽修改魚的資訊
    if (newEditFishInfo !== oldEditFishInfo) {
      const newNode = {
        name: newEditFishInfo.key,
        detail: newEditFishInfo,
        value: "",
        category: categories[newEditFishInfo.location]
      };
      const newNodes = tunaData.nodes.map((node, i) => {
        if (node.name === newNode.name) {
          return newNode;
        }
        return node;
      });
      const newTunaData = { ...tunaData, nodes: newNodes };
      this.setState({ editFishInfo: newEditFishInfo, tunaData: newTunaData });
    }
  }

  add_newFish = () => {
    const { tunaData, newFishInfo } = this.state;
    delete newFishInfo.moment;

    axios
      .get(`${config.apiURL}/tunas`, { withCredentials: true })
      .then(res => {
        if (res.status === 200) {
          console.log("[成功撈到很多隻魚]");
          console.log("[計算目前魚的總數]", res.data.length);
          const newKey = res.data.length + 1;
          // const postData = { ...newFishInfo, id: 99, key: "99" };
          const postData = { ...newFishInfo, key: newKey.toString() };
          console.log("postData", postData);

          console.log("[進行 新增一條魚流程]");
          axios({
            method: "post",
            url: `${config.apiURL}/tuna`,
            data: postData,
            timeout: 5000,
            withCredentials: true
          })
            .then(res => {
              console.log(res);
              if (res.data === "v_postTuna") {
                console.log("[新增一條魚成功]");
                const newNodes = {
                  name: postData.key,
                  detail: postData,
                  value: "",
                  category: categories[postData.location]
                };

                const newTunaData = {
                  ...tunaData,
                  nodes: tunaData.nodes.concat(newNodes)
                };

                this.props.cb_newFishInfo(postData);
                console.log("[新增一條魚 - Header(子) 傳 Tunas(父)]", postData);

                this.setState({
                  tunaData: newTunaData,
                  newFishInfo: {
                    vessel: null,
                    timestamp: moment().format("YYYYMMDD"),
                    moment: moment(),
                    location: "太平洋",
                    holder: null
                  },
                  btnStatus: {
                    add: false
                  }
                });

                console.log("[塞進去一條魚到 state(for search)]", newTunaData);
              }
            })
            .catch(error => {
              console.log(error);
            });
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  add_newUser = () => {
    const { userName, newUserName } = this.state;
    if (newUserName.split("_")[0] === "user") {
      console.log("[進行 新增使用者]");

      // const postData = {
      //   id: 22,
      //   name: newUserName
      // };
      const postData = {
        name: newUserName
      };

      axios({
        method: "post",
        url: `${config.apiURL}/user`,
        data: postData,
        timeout: 5000,
        withCredentials: true
      })
        .then(res => {
          console.log(res);
          if (res.data === "v_postUser") {
            console.log("[成功新增使用者]");
            dialog("success", "新增 使用者", `${newUserName} 新增成功`);
          } else if (res.data === "user_alExists") {
            console.log("[使用者已註冊]");
            dialog("error", "註冊 使用者", "[使用者已註冊]");
          }
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      console.log("[輸入錯誤使用者註冊 name] 或 [輸入框為空]");
      dialog("error", "註冊 使用者", "[輸入框為空] 或 [輸入使用者名稱錯誤]");
    }
  };

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
  signOut = () => {
    // TODO 刪除本地端 cookie
    console.log("[進行 登出流程]");
    localStorage.removeItem("userName");
    localStorage.removeItem("userRole");
    this.setState({ redirectToLogin: true });
  };

  render() {
    const {
      userName,
      userRole,
      btnStatus,
      newFishInfo,
      redirectToLogin
    } = this.state;

    if (redirectToLogin) {
      return <Redirect push to="/login" />;
    }

    //TODO 點到其他地方 選單自動收合

    return (
      <div id="header">
        <div className="header-left">
          <div className="logo">
            <Link to={`/`}>
              <img src={img_logo} alt="logo" />
            </Link>
          </div>
          <div className="tuna-operating">

            {userRole === "admin"
              ? <div className="tuna_btn_block">
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
                  <div
                    className={btnStatus.add ? "tuna_card-open" : "tuna_card"}
                  >
                    <div className="tuna_card-inner">
                      <Input
                        placeholder="輸入 姓名"
                        value={newFishInfo.holder}
                        onChange={e =>
                          this.setState({
                            newFishInfo: {
                              ...newFishInfo,
                              holder: e.target.value
                            }
                          })}
                      />
                      <Input
                        placeholder="輸入 船名"
                        value={newFishInfo.vessel}
                        onChange={e =>
                          this.setState({
                            newFishInfo: {
                              ...newFishInfo,
                              vessel: e.target.value
                            }
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
                            newFishInfo: {
                              ...newFishInfo,
                              moment,
                              timestamp: e
                            }
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
              : null}

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
                      <Input
                        placeholder="輸入 新使用者名稱"
                        onChange={e =>
                          this.setState({ newUserName: e.target.value })}
                      />
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
            <div className="user_role">{userRole}</div>
            <div className="user_name">{userName}</div>
          </div>
          <div className="sign-out">
            <div className="tuna_btn_block">
              <div className="tuna-btn" onClick={this.signOut}>
                <a>登出</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
