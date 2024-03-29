import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router";

import { isServer } from "../store";

import Header from "./header";
import Routes from "./routes";

import "./app.css";
import "bootstrap/dist/css/bootstrap.min.css";

class App extends Component {
  render() {
    return (
      <div id="app">
        <Header current={this.props.location.pathname} />
        <div id="content">
          <Routes />
        </div>
      </div>
    );
  }
}

const mapStateToProps = null;
const mapDispatchToProps = null;

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
