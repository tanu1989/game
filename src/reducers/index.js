import { combineReducers } from "redux";
import { GET_GAME_DATA } from "../actions/index";

const initialState = {
  isLoading: false,
  gameData: {
    levels: []
  },
  difficultyLevel: null
};

const game = (state = initialState, action) => {
  switch (action.type) {
    case GET_GAME_DATA.IN_PROGRESS:
      return { ...state, isLoading: true };
    case GET_GAME_DATA.SUCCESS:
      return { ...state, isLoading: false, gameData: action.payload };
    default:
      return state;
  }
};

const GameReducer = combineReducers({
  game
});

export default GameReducer;
