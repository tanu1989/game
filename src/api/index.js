import axios from "axios";

export function getGameData() {
  const url = "https://web-code-test-dot-nyt-games-prd.appspot.com/cards.json";
  return axios
    .get(url)
    .then(res => res.data)
    .catch(err => err);
}
