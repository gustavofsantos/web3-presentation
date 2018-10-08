import React from "react";
import PropTypes from "prop-types";

const style = {
  background: "#F7F7F7",
  color: "#202020",
  borderColor: "#202020",
  borderWidth: "8px",
  padding: "14px",
  width: "100%",
  margin: "10px"
};

const Input = (props) => (
  <input style={style} value={props.value} onChange={props.handleInputChange} />
);

Input.propTypes = {
  handleInputChange: PropTypes.func,
  value: PropTypes.string
};

export default Input;
