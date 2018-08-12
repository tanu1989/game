import { combineReducers } from "redux";
import {
  GET_GAME_DATA,
  SET_DIFFICULTY,
  FINISH_GAME,
  RECORD_FINISH_TIME,
  RESTART_GAME
} from "../actions/index";

const initialState = {
  isLoading: false,
  gameData: {
    levels: []
  },
  difficultyLevel: "",
  isGameComplete: false,
  completedTime: null
};

const game = (state = initialState, action) => {
  switch (action.type) {
    case GET_GAME_DATA.IN_PROGRESS:
      return { ...state, isLoading: true };
    case GET_GAME_DATA.SUCCESS:
      return { ...state, isLoading: false, gameData: action.payload };
    case SET_DIFFICULTY:
      return {
        ...state,
        isGameComplete: false,
        difficultyLevel: action.payload
      };
    case FINISH_GAME:
      return {
        ...state,
        difficultyLevel: "",
        isGameComplete: true,
        completedTime: action.payload
      };
    case RESTART_GAME:
      return {
        ...state,
        isGameComplete: false,
        completedTime: null
      };
    default:
      return state;
  }
};

const GameReducer = combineReducers({
  game
});

export default GameReducer;
