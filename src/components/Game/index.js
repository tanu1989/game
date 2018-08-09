import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as actions from "../../actions/index";
import Timer from "../Timer";
import DifficultyPicker from "../DifficultyPicker";
import GameGrid from "../GameGrid";
import { GameWrapper } from "./styles";
import _ from "lodash";

const difficultyLevels = levels => levels.map(level => level.difficulty);

class Game extends PureComponent {
  state = {
    activeCards: [],
    count: 0,
    cardInView: null,
    visibleCards: []
  };
  componentDidMount() {
    this.props.fetchGameData();
  }

  onDifficultySelect = level => {
    const { gameData } = this.props;

    const addIdToLevels = gameData.levels.map(level => {
      return {
        ...level,
        cards: level.cards.map((card, key) => ({ id: key, card }))
      };
    });
    const arr = addIdToLevels.find(l => l.difficulty === level);

    this.setState({
      activeCards: arr.cards,
      count: arr.cards.length
    });
    this.props.setDifficulty(level);
  };

  sameCards = obj => {
    const filteredArr = this.state.activeCards.filter(
      el => el.card !== obj.card
    );
    this.setState({
      activeCards: filteredArr,
      count: filteredArr.length,
      cardInView: null,
      visibleCards: []
    });
  };

  diffCards = () => {
    this.setState({
      cardInView: null,
      visibleCards: []
    });
  };

  newEntry = obj => {
    this.setState({
      cardInView: obj
    });
  };

  //Adding a debounce to make the transition a little more visible
  checkConditions = _.debounce(obj => {
    if (!this.state.cardInView) {
      this.newEntry(obj);
    } else if (this.state.cardInView.card === obj.card) {
      this.sameCards(obj);
    } else {
      this.diffCards();
    }
  }, 400);

  onCardClick = obj => {
    const id = obj.id;
    this.setState(
      state => ({
        visibleCards: [...state.visibleCards, id]
      }),
      () => {
        this.checkConditions(obj);
      }
    );
  };

  render() {
    const { gameData, difficultyLevel } = this.props;

    return (
      <GameWrapper>
        <h1>Memory Board Game</h1>
        <Timer />
        <DifficultyPicker
          levels={difficultyLevels(gameData.levels)}
          onSelect={this.onDifficultySelect}
        />
        {difficultyLevel && (
          <GameGrid
            cards={this.state.activeCards}
            visibleCards={this.state.visibleCards}
            onClick={this.onCardClick}
          />
        )}
        <div>Let the games begin (here).</div>
      </GameWrapper>
    );
  }
}
Game.propTypes = {
  fetchGameData: PropTypes.func.isRequired,
  gameData: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  difficultyLevel: PropTypes.string.isRequired,
  setDifficulty: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  gameData: state.game.gameData,
  isLoading: state.game.isLoading,
  difficultyLevel: state.game.difficultyLevel
});

const mapDispatchToProps = {
  fetchGameData: actions.fetchGameData,
  setDifficulty: actions.setDifficulty
};

export const DisconnectedGame = Game;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Game);
