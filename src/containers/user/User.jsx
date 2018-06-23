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
              <div>
                <Input placeholder="user name" />
                <Button>
                  <Link to={`/`}>
                    登入
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default User;
