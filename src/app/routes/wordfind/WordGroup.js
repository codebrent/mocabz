import React from "react";

function getClassName(length) {
  switch (length) {
    case 3:
      return "badge badge-primary";
    case 4:
      return "badge badge-secondary";
    case 5:
      return "badge badge-success";
    case 6:
      return "badge badge-warning";
    case 7:
      return "badge badge-dark";
    default:
      return "badge badge-danger";
  }
}

const WordGroup = props => {
  const { length, words = null } = props;
  return (
    words &&
    words.length > 0 && (
      <div>
        {words.map(word => (
          <span className={getClassName(length)} key={word}>
            {word}
          </span>
        ))}
        <span className="word-count">({words.length})</span>
      </div>
    )
  );
};
export default WordGroup;
