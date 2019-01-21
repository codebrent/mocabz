import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { frontloadConnect } from "react-frontload";
import WordGroup from "./WordGroup";

import { removeResult } from "../../../modules/wordfind";

const frontload = props => Promise.resolve({});

class Result extends Component {
  constructor(props) {
    super(props);
    this.state = { word: "" };
  }

  onRemoveResult = word => {
    const { removeResult } = this.props;
    if (typeof word === "string") {
      removeResult(word);
    }
  };

  render() {
    const { wordfind, onRemoveResult } = this.props;
    const { word = null } = wordfind;
    const { three, four, five, six, seven } = wordfind.wordfind;
    return (
      word && (
        <div className="card">
          <h2 className="card-header">
            {word.toUpperCase()}
            <button
              type="button"
              className="close"
              onClick={() => {
                this.onRemoveResult(word);
              }}
            >
              <span>&times;</span>
            </button>
          </h2>
          <div className="card-body">
            <WordGroup key={7} length={7} words={seven} />
            <WordGroup key={6} length={6} words={six} />
            <WordGroup key={5} length={5} words={five} />
            <WordGroup key={4} length={4} words={four} />
            <WordGroup key={3} length={3} words={three} />
          </div>
        </div>
      )
    );
  }
}

const mapDispatchToProps = {
  removeResult
};

export default connect(
  null,
  mapDispatchToProps
)(
  frontloadConnect(frontload, {
    onMount: true,
    onUpdate: false
  })(Result)
);
