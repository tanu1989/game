import React from "react";
import PropTypes from "prop-types";

//TODO: change the div to something else - or add a role
const DifficultyPicker = ({ levels, onSelect }) => {
  return levels.map(level => (
    <div onClick={() => onSelect(level)}>{level}</div>
  ));
};

DifficultyPicker.propTypes = {
  levels: PropTypes.arrayOf(PropTypes.string),
  onSelect: PropTypes.func.isRequired
};

export default DifficultyPicker;
