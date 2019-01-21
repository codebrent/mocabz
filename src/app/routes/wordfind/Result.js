import React from "react";
import WordGroup from "./WordGroup";

const Result = props => {
  const { wordfind, onRemoveResult } = props;
  const { word = null } = wordfind;
  const { three, four, five, six, seven } = wordfind.wordfind;
  const removeResult = word => {
    if (typeof word === "string") {
      onRemoveResult(word);
    }
  };
  return (
    word && (
      <div className="card">
        <h2 className="card-header">
          {word.toUpperCase()}
          <button
            type="button"
            className="close"
            onClick={() => {
              removeResult(word);
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
};
export default Result;
