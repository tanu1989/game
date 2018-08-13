import React from "react";
import PropTypes from "prop-types";
import Timer from "../Timer";
import { GameTile, GameTileContainer, Card, Front, Back } from "./styles";

const checkIfVisible = (visibleCards, id) => {
  return visibleCards.includes(id);
};

const GameGrid = ({
  cards,
  onClick,
  visibleCards,
  cardsMatched,
  isGameComplete,
  recordTime,
  timeTrack,
  startTimer
}) => {
  return (
    <div>
      <Timer
        timeTrack={timeTrack}
        recordTime={recordTime}
        startTimer={startTimer}
      />
      <GameTileContainer>
        {cards.map(elem => (
          <GameTile>
            <Card
              show={checkIfVisible(visibleCards, elem.id)}
              onClick={() => onClick(elem)}
            >
              <Front />
              <Back>{elem.card}</Back>
            </Card>
          </GameTile>
        ))}
      </GameTileContainer>
    </div>
  );
};

GameGrid.defaultProps = {
  cards: [],
  visibleCards: []
};
GameGrid.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.string),
  onClick: PropTypes.func.isRequired,
  visibleCards: PropTypes.array,
  recordTime: PropTypes.func.isRequired,
  timeTrack: PropTypes.number.isRequired
};

export default GameGrid;
