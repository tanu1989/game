import React from "react";
import PropTypes from "prop-types";
import { GameTile, GameTileContainer, CardIcon } from "./styles";

const checkIfVisible = (visibleCards, id) => {
  return visibleCards.includes(id);
};

const GameGrid = ({ cards, onClick, visibleCards }) => {
  return (
    <GameTileContainer>
      {cards.map(elem => (
        <GameTile
          show={checkIfVisible(visibleCards, elem.id)}
          onClick={() => onClick(elem)}
        >
          <CardIcon>{elem.card}</CardIcon>
        </GameTile>
      ))}
    </GameTileContainer>
  );
};

GameGrid.defaultProps = {
  cards: [],
  visibleCards: []
};
GameGrid.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.string),
  onClick: PropTypes.func.isRequired,
  visibleCards: PropTypes.array
};

export default GameGrid;
