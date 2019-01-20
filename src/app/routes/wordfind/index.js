import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { frontloadConnect } from "react-frontload";
import Page from "../../components/page";
import Result from "./Result";

import { getWordfindResult, setWord } from "../../../modules/wordfind";

const frontload = props => Promise.resolve({});

class Wordfind extends Component {
  constructor(props) {
    super(props);
    this.state = { word: "" };
  }

  onInputChange = event => {
    this.setState({ word: event.target.value });
  };

  onKeyPress = event => {
    var keyCode = event.keyCode || event.which;
    if (keyCode == "13") {
      this.onSubmit(event);
      return false;
    }
  };

  onSubmit = event => {
    const { word } = this.state;
    const { setWord, getWordfindResult } = this.props;
    setWord(word);
    getWordfindResult(word);
  };

  onRemoveResult = event => {
    console.log("onRemoveResult");
  };

  onRemoveWord = event => {
    console.log("onRemoveWord");
  };

  render() {
    const { word, wordfinds } = this.props;
    return (
      <Page id="wordfind" description={`This is a wordfind generator`}>
        <div className="input-group mb-3">
          <input
            type="text"
            name="word"
            className="form-control"
            placeholder="Enter 3 to 7 letters"
            value={this.state.word}
            onChange={this.onInputChange}
            onKeyPress={this.onKeyPress}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={this.onSubmit}
            >
              Generate
            </button>
          </div>
        </div>
        {wordfinds.map(wfind => (
          <Result
            wordfind={wfind}
            onRemoveResult={this.onRemoveResult}
            onRemoveWord={this.onRemoveWord}
          />
        ))}
      </Page>
    );
  }
}

const mapStateToProps = state => ({
  ...state["wordfind"]
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getWordfindResult,
      setWord
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  frontloadConnect(frontload, {
    onMount: true,
    onUpdate: false
  })(Wordfind)
);
