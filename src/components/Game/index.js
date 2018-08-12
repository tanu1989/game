import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as actions from "../../actions/index";
import DifficultyPicker from "../DifficultyPicker";
import GameGrid from "../GameGrid";
import { GameWrapper, StyledButton, GameCompleteWrapper } from "./styles";
import _ from "lodash";
import Timer from "../Timer";
import { formatTime } from "../../utils/format";

const difficultyLevels = levels => levels.map(level => level.difficulty);

const initialState = {
  count: 0,
  cardInView: null,
  visibleCards: []
};

class Game extends PureComponent {
  state = {
    ...initialState,
    timeTrack: 0,
    activeCards: []
  };
  componentDidMount() {
    this.props.fetchGameData();
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextState.count === 0 && this.state.count === 2) {
      this.props.completeGame(formatTime(this.state.timeTrack));
    }
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
      count: arr.cards.length,
      timeTrack: 0
    });
    this.props.setDifficulty(level);
  };

  matchingCards = obj => {
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

  sameCards = () => {
    this.setState(state => ({
      ...state,
      ...initialState
    }));
  };

  //Adding a debounce to make the transition a little more visible
  checkConditions = _.debounce(obj => {
    if (!this.state.cardInView) {
      this.newEntry(obj);
    } else if (obj.id === this.state.cardInView.id) {
      this.sameCards();
    } else if (this.state.cardInView.card === obj.card) {
      this.matchingCards(obj);
    } else {
      this.diffCards();
    }
  }, 600);

  onCardClick = obj => {
    const id = obj.id;

    const { cardInView, visibleCards } = this.state;
    const arr =
      cardInView && obj.id === cardInView.id ? [] : [...visibleCards, id];
    this.setState(
      state => ({
        visibleCards: arr
      }),
      () => {
        this.checkConditions(obj);
      }
    );
  };

  record = time => {
    this.setState({
      timeTrack: time
    });
  };

  render() {
    const {
      gameData,
      difficultyLevel,
      completedTime,
      isGameComplete,
      recordCompleteTime,
      handleGameRestart
    } = this.props;

    const { activeCards, visibleCards, timeTrack } = this.state;

    return (
      <GameWrapper>
        <h1>Memory Board Game</h1>
        <div>Pick a difficulty level</div>
        <DifficultyPicker
          activeButton={difficultyLevel}
          levels={difficultyLevels(gameData.levels)}
          onSelect={this.onDifficultySelect}
        />
        {isGameComplete && (
          <GameCompleteWrapper>
            <div>{`Game is complete in ${completedTime}`}</div>
            <StyledButton onClick={handleGameRestart}>Start over</StyledButton>
          </GameCompleteWrapper>
        )}
        {activeCards.length !== 0 && (
          <GameGrid
            timeTrack={timeTrack}
            recordTime={this.record}
            cards={activeCards}
            visibleCards={visibleCards}
            onClick={this.onCardClick}
          />
        )}
      </GameWrapper>
    );
  }
}
Game.propTypes = {
  fetchGameData: PropTypes.func.isRequired,
  gameData: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  difficultyLevel: PropTypes.string.isRequired,
  setDifficulty: PropTypes.func.isRequired,
  isGameComplete: PropTypes.bool.isRequired,
  completeGame: PropTypes.func.isRequired,
  completedTime: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  gameData: state.game.gameData,
  isLoading: state.game.isLoading,
  difficultyLevel: state.game.difficultyLevel,
  isGameComplete: state.game.isGameComplete,
  completedTime: state.game.completedTime
});

const mapDispatchToProps = {
  fetchGameData: actions.fetchGameData,
  setDifficulty: actions.setDifficulty,
  completeGame: actions.completeGame,
  handleGameRestart: actions.handleGameRestart
};

export const DisconnectedGame = Game;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Game);
