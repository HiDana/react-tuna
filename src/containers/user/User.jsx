import React, { Component } from "react";
// import { Link } from "react-router-dom";
import { Redirect } from "react-router";
import { Input } from "antd";
import axios from "axios";
import { config } from "../../config";
import "../../style/main.css";
//fn
import { dialog } from "../../components/fn/fn";

// images
import img_logo from "../../images/logo.png";

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      redirectToTuna: false
    };
  }
  register = () => {
    const { userName } = this.state;
    const admin_role = userName.split("_")[0] === "admin";

    // const postData = {
    //   id: 11,
    //   name: userName
    // };

    const postData = {
      name: userName
    };

    if (admin_role) {
      console.log("[進行 管理者註冊流程]");
      axios
        .post(`${config.apiURL}/admin`, postData)
        .then(res => {
          console.log(res.data);
          if (res.data === "v_postAdmin") {
            console.log("[管理者註冊成功]");
            dialog("success", "註冊 管理員", `${userName} 註冊成功`);
          } else if (res.data === "admin_alExists") {
            console.log("[管理者已註冊]");
            dialog("error", "註冊 管理員", "[管理者已註冊]");
          }
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      console.log("[輸入錯誤管理者註冊 name] 或 [輸入框為空]");
      dialog("error", "註冊 管理員", "[輸入框為空] 或 [輸入管理員名稱錯誤]");
    }
  };

  login = () => {
    const { userName } = this.state;
    if (userName !== "") {
      console.log("[進行 管理者/使用者 登入流程]");
      const user_role = userName.split("_")[0];
      const user_name = userName.split("_")[1];

      axios
        .post(`${config.apiURL}/login`)
        .then(res => {
          console.log(res.data);
          if (res.data === "v_postLogin") {
            console.log("[管理者/使用者 存在，開始登入]");
            localStorage.userName = user_name;
            localStorage.userRole = user_role;
            this.setState({ redirectToTuna: true });
          } else if (res.data === "user_nExists") {
            console.log("[管理者/使用者 不存在，請先註冊]");
            dialog("error", "登入", "[管理者/使用者 不存在，請先註冊]");
          }
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      console.log("[輸入框為空]");
      dialog("error", "登入", "[輸入框為空]");
    }
  };

  render() {
    // console.log("render", this.state.userName);
    const { redirectToTuna } = this.state;
    if (redirectToTuna) {
      return <Redirect push to="/" />;
    }

    return (
      <div id="user">
        <div className="box">
          <div className="wave -one" />
          <div className="wave -two" />
          <div className="wave -three" />
          <div className="title">
            <div className="login">
              <img src={img_logo} alt="logo" className="logo" />
              <div className="login_box">
                <Input
                  placeholder="user name"
                  onChange={e => this.setState({ userName: e.target.value })}
                />
                <div className="login_btn_box">
                  <div className="user_btn" onClick={this.register}>
                    <a>註冊</a>
                  </div>
                  <div className="user_btn" onClick={this.login}>
                    <a>登入</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default User;
