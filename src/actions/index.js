import { makeAsyncActions, makeActions } from "../utils";
import * as api from "../api/index";

export const { GET_GAME_DATA } = makeAsyncActions("NYT", ["GET_GAME_DATA"]);

export const { SET_DIFFICULTY } = makeActions("NYT", ["SET_DIFFICULTY"]);

export const setDifficulty = level => {
  return { type: SET_DIFFICULTY, payload: level };
};

export const fetchGameData = () => {
  return dispatch => {
    dispatch({ type: GET_GAME_DATA.IN_PROGRESS });
    return api.getGameData().then(response => {
      dispatch({ type: GET_GAME_DATA.SUCCESS, payload: response });
    });
  };
};
