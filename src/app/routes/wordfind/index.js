import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { frontloadConnect } from "react-frontload";
import Page from "../../components/page";

import { getWordfindResult, setWord } from "../../../modules/wordfind";

const frontload = () => undefined;

class Wordfind extends Component {
  render() {
    return (
      <Page id="wordfind" description={`This is a wordfind generator`}>
        <input type="text" />
        <hr />
        <div>{JSON.stringify(this.props.wordfind)}</div>
        <div>Wordfind</div>
      </Page>
    );
  }
}

const mapStateToProps = state => ({
  word: state.word,
  wordfind: state.wordfind
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ getWordfindResult, setWord }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  frontloadConnect(frontload, {
    onMount: true,
    onUpdate: false
  })(Wordfind)
);
