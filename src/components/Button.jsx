/* eslint-disable react/prop-types */
import PropTypes from "prop-types";

const Button = (props) => {
  const { buttonName, handleOnClick } = props; //Props validation required

  return (
    <button
      className={buttonName === "=" ? "equal-button button" : "button"}
      onClick={() => handleOnClick(buttonName)}
    >
      {buttonName}
    </button>
  );
};

// Prop validation
Button.propTypes = {
  buttonName: PropTypes.string.isRequired,
};

export default Button;
