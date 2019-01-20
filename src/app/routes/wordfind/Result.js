import React from "react";
import WordGroup from "./WordGroup";

const Result = props => {
  const { wordfind, onRemoveResult, onRemoveWord } = props;
  const { word = null } = wordfind;
  const { three, four, five, six, seven } = wordfind.wordfind;
  return (
    word && (
      <div className="card">
        <h2 className="card-header">
          {word.toUpperCase()}
          <button type="button" class="close">
            <span>&times;</span>
          </button>
        </h2>
        <div className="card-body">
          <WordGroup length={7} words={seven} onRemove={onRemoveWord} />
          <WordGroup length={6} words={six} onRemove={onRemoveWord} />
          <WordGroup length={5} words={five} onRemove={onRemoveWord} />
          <WordGroup length={4} words={four} onRemove={onRemoveWord} />
          <WordGroup length={3} words={three} onRemove={onRemoveWord} />
        </div>
      </div>
    )
  );
};
export default Result;
