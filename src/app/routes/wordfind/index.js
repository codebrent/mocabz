import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { frontloadConnect } from "react-frontload";
import Page from "../../components/page";

import { getWordfindResult } from "../../../modules/wordfind";

const frontload = () => undefined;

class Wordfind extends Component {
  render() {
    return (
      <Page id="wordfind" description={`This is a wordfind generator`}>
        Wordfind
      </Page>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ getWordfindResult }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  frontloadConnect(frontload, {
    onMount: true,
    onUpdate: false
  })(Wordfind)
);
