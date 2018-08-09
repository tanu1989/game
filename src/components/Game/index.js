import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchGameData } from "../../actions/index";
import Timer from "../Timer";
import DifficultyPicker from "../DifficultyPicker";
import { GameWrapper } from "./styles";

const difficultyLevels = levels => levels.map(level => level.difficulty);

class Game extends PureComponent {
  componentDidMount() {
    this.props.fetchGameData();
  }

  onDifficultySelect = level => {
    console.log(level);
  };

  render() {
    const { game } = this.props;

    return (
      <GameWrapper>
        <h1>Memory Board Game</h1>
        <Timer />
        <DifficultyPicker
          levels={difficultyLevels(game.gameData.levels)}
          onSelect={this.onDifficultySelect}
        />
        <div>Let the games begin (here).</div>
      </GameWrapper>
    );
  }
}
Game.propTypes = {
  fetchGameData: PropTypes.func.isRequired,
  game: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  game: state.game
});

const mapDispatchToProps = {
  fetchGameData: fetchGameData
};

export const DisconnectedGame = Game;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Game);
