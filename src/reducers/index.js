import { combineReducers } from "redux";
import { GET_GAME_DATA, SET_DIFFICULTY } from "../actions/index";

const initialState = {
  isLoading: false,
  gameData: {
    levels: []
  },
  difficultyLevel: ""
};

const game = (state = initialState, action) => {
  switch (action.type) {
    case GET_GAME_DATA.IN_PROGRESS:
      return { ...state, isLoading: true };
    case GET_GAME_DATA.SUCCESS:
      return { ...state, isLoading: false, gameData: action.payload };
    case SET_DIFFICULTY:
      return { ...state, difficultyLevel: action.payload };
    default:
      return state;
  }
};

const GameReducer = combineReducers({
  game
});

export default GameReducer;
