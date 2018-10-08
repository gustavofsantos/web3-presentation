import React from "react";
import PropTypes from "prop-types";

const style = {
  background: "#202020",
  color: "#F7F7F7",
  border: "none",
  padding: "14px",
  width: "100%",
  margin: "10px"
};

const Button = (props) => (
  <button style={style} onClick={props.handleOnClick}>
    {props.text}
  </button>
);

Button.propTypes = {
  handleOnClick: PropTypes.func,
  text: PropTypes.string
};

export default Button;

