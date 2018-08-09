import React, { Component } from "react";
import styles from "./App.scss";
import Game from "../Game";

class App extends Component {
  render() {
    return (
      <div className={styles.App}>
        <Game />
      </div>
    );
  }
}

export default App;
