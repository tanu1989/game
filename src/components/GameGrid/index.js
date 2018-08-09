import React from "react";
import PropTypes from "prop-types";
import { GameTile, GameTileContainer, CardIcon } from "./styles";

const GameGrid = ({ cards, onClick }) => {
  return (
    <GameTileContainer>
      {cards.map(elem => (
        <GameTile onClick={() => onClick(elem)}>
          <CardIcon>{elem.card}</CardIcon>
        </GameTile>
      ))}
    </GameTileContainer>
  );
};

GameGrid.defaultProps = {
  cards: []
};
GameGrid.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.string),
  onClick: PropTypes.func.isRequired
};

export default GameGrid;
