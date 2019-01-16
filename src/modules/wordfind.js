import pekka from "../app/assets/pekka.jpg";
import arvidsson from "../app/assets/arvidsson.jpg";

export const SET_WORD_FIND_RESULT = "SET_WORD_FIND_RESULT";

const initialState = {
  wordfind: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_WORD_FIND_RESULT:
      return {
        ...state,
        wordfind: action.payload
      };

    default:
      return state;
  }
};

export const getWordfindResult = chars => dispatch =>
  fetch()
    .then(data => data.json())
    .then(json =>
      dispatch({
        type: SET_WORD_FIND_RESULT,
        payload: json
      })
    );
