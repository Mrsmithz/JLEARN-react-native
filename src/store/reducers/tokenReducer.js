import { ADD_TOKEN } from "../actions/tokenAction";
import axios from "axios"

const initialState = {
  accessToken: "",
};

const tokenReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TOKEN:
        return { accessToken: action.token};
    default:
        return state;
  }
};

export default tokenReducer;
