import React from "react";
import PropTypes from "prop-types";
import { DPWrapper, DifficultyButton } from "./styles";
import _ from "lodash";

const DifficultyPicker = ({ levels, onSelect, activeButton }) => {
  return (
    <DPWrapper>
      {levels.map(level => (
        <DifficultyButton onClick={() => onSelect(level)}>
          {_.startCase(level)}
        </DifficultyButton>
      ))}
    </DPWrapper>
  );
};

DifficultyPicker.propTypes = {
  activeButton: PropTypes.string.isRequired,
  levels: PropTypes.arrayOf(PropTypes.string),
  onSelect: PropTypes.func.isRequired
};

export default DifficultyPicker;
