import { makeAsyncActions, makeActions } from "../utils/actionUtils";
import * as api from "../api/index";

export const { GET_GAME_DATA } = makeAsyncActions("NYT", ["GET_GAME_DATA"]);

export const { SET_DIFFICULTY, FINISH_GAME, RESTART_GAME } = makeActions(
  "NYT",
  ["SET_DIFFICULTY", "FINISH_GAME", "RESTART_GAME"]
);

export const setDifficulty = level => {
  return { type: SET_DIFFICULTY, payload: level };
};

export const completeGame = time => {
  return { type: FINISH_GAME, payload: time };
};

export const fetchGameData = () => {
  return dispatch => {
    dispatch({ type: GET_GAME_DATA.IN_PROGRESS });
    return api.getGameData().then(response => {
      dispatch({ type: GET_GAME_DATA.SUCCESS, payload: response });
    });
  };
};

export const handleGameRestart = () => {
  return { type: RESTART_GAME };
};
