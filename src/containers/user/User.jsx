import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Card, Input, Button } from "antd";
import "../../style/main.css";
// images
import img_logo from "../../images/logo.png";

class User extends Component {
  render() {
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
                <Input placeholder="user name" />
                <div className="login_btn_box">
                  <div className="user_btn">
                    <a>
                      註冊
                    </a>
                  </div>
                  <div className="user_btn">
                    <Link to={`/`}>
                      登入
                    </Link>
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
