const DisplayBox = (props) => {
  // eslint-disable-next-line react/prop-types
  const { displayValue } = props;
  return <div className="display-box">{displayValue || "0.0"}</div>;
};
export default DisplayBox;
