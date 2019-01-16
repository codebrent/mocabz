import { combineReducers } from "redux";

import auth from "./auth";
import wordfind from "./wordfind";

export default combineReducers({
  auth,
  wordfind
});
