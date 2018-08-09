import { makeAsyncActions } from "../utils";
import * as api from "../api/index";

export const { GET_GAME_DATA } = makeAsyncActions("NYT", ["GET_GAME_DATA"]);

export function fetchGameData() {
  return dispatch => {
    dispatch({ type: GET_GAME_DATA.IN_PROGRESS });
    return api.getGameData().then(response => {
      dispatch({ type: GET_GAME_DATA.SUCCESS, payload: response });
    });
  };
}
