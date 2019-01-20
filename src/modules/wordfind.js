import pekka from "../app/assets/pekka.jpg";
import arvidsson from "../app/assets/arvidsson.jpg";

export const SET_WORDFIND_RESULT = "SET_WORDFIND_RESULT";
export const SET_WORD = "SET_WORD";

const initialState = {
  word: "",
  wordfinds: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_WORD:
      return {
        ...state,
        word: action.payload
      };

    case SET_WORDFIND_RESULT:
      return {
        ...state,
        wordfinds: [...state.wordfinds, action.payload]
      };

    default:
      return state;
  }
};

export const setWord = word => dispatch =>
  dispatch({
    type: SET_WORD,
    payload: word
  });

export const getWordfindResult = word => dispatch =>
  fetch(`api/wordfind/${word}`)
    .then(data => data.json())
    .then(json =>
      dispatch({
        type: SET_WORDFIND_RESULT,
        payload: {
          word,
          wordfind: json
        }
      })
    );
