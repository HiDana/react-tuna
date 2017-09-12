import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import * as actions from "../actions";

class Redux extends Component {
  renderButton() {
    if (this.props.reduxTest) {
      return (
        <button onClick={() => this.props.sendTestAction(false)}>
          true
        </button>
      );
    }
    return (
      <button onClick={() => this.props.sendTestAction(true)}>false</button>
    );
  }

  render() {
    console.log("use props to get the redux data", this.props.reduxTest);
    return (
      <div>
        <h3>redux pass data test</h3>
        <p>{this.props.reduxTest}</p>
        {this.renderButton()}
      </div>
    );
  }
}

//redux data define
Redux.contextTypes = {
  store: PropTypes.object.isRequired
};

//get redux data from reducer's state
function mapStateToProps(state) {
  return { reduxTest: state.reduxTest };
}

//export and connext redux's actions and reducers
export default connect(mapStateToProps, actions)(Redux);
