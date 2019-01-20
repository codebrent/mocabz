import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { frontloadConnect } from "react-frontload";
import Page from "../../components/page";

import { getWordfindResult, setWord } from "../../../modules/wordfind";

const frontload = props => Promise.resolve({});

class Wordfind extends Component {
  constructor(props) {
    super(props);
    this.state = { word: "aa" };
  }

  onInputChange(event) {
    this.setState({ word: event.target.value });
  }

  onSubmit(event) {
    const { word } = this.state;
    const { setWord, getWordfindResult } = this.props;
    setWord(word);
    getWordfindResult(word);
  }

  render() {
    const { word, wordfinds } = this.props;
    return (
      <Page id="wordfind" description={`This is a wordfind generator`}>
        <input
          type="text"
          name="word"
          value={this.state.word}
          onChange={this.onInputChange.bind(this)}
        />
        <button onClick={this.onSubmit.bind(this)}>OK</button>
        {wordfinds.map((wfind, idx) => (
          <div key={idx}>
            <hr />
            <h2>{wfind.word}</h2>
            {wfind.wordfind["three"].length > 0 && (
              <div>
                <b>Three: ({wfind.wordfind["three"].length}) </b>
                {wfind.wordfind["three"].join(" ,")}
              </div>
            )}
            {wfind.wordfind["four"].length > 0 && (
              <div>
                <b>Four: ({wfind.wordfind["four"].length}) </b>
                {wfind.wordfind["four"].join(" ,")}
              </div>
            )}
            {wfind.wordfind["five"].length > 0 && (
              <div>
                <b>Five: ({wfind.wordfind["five"].length}) </b>
                {wfind.wordfind["five"].join(" ,")}
              </div>
            )}
            {wfind.wordfind["six"].length > 0 && (
              <div>
                <b>Six: ({wfind.wordfind["six"].length}) </b>
                {wfind.wordfind["six"].join(" ,")}
              </div>
            )}
          </div>
        ))}
      </Page>
    );
  }
}

const mapStateToProps = state => ({
  ...state["wordfind"]
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
