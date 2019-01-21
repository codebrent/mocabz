export const SET_WORDFIND_RESULT = "SET_WORDFIND_RESULT";
export const SET_WORD = "SET_WORD";
export const REMOVE_RESULT = "REMOVE_RESULT";

const initialState = {
  word: "",
  wordfinds: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_WORD: {
      return {
        ...state,
        word: action.payload
      };
    }

    case SET_WORDFIND_RESULT: {
      const { word } = action.payload;
      const { wordfinds } = state;
      const isDuplicate =
        wordfinds.map(wordfind => wordfind.word).indexOf(word) !== -1;
      return isDuplicate
        ? state
        : {
            ...state,
            wordfinds: [action.payload, ...state.wordfinds]
          };
    }

    case REMOVE_RESULT: {
      return {
        ...state,
        wordfinds: state.wordfinds.filter(
          wordfind => wordfind.word !== action.payload
        )
      };
    }

    default:
      return state;
  }
};

export const removeResult = word => {
  return dispatch =>
    dispatch({
      type: REMOVE_RESULT,
      payload: word
    });
};

export const setWord = word => {
  return dispatch =>
    dispatch({
      type: SET_WORD,
      payload: word
    });
};

export const getWordfindResult = word => {
  return dispatch =>
    fetch(`api/wordfind/${word}`)
      .then(data => data.json())
      .then(json =>
        dispatch({
          type: SET_WORDFIND_RESULT,
          payload: {
            word: json.original,
            wordfind: json
          }
        })
      )
      .catch(err => {
        console.log("caught");
        console.log(err);
      });
};
