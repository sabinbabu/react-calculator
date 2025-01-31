import "./App.css";
import DisplayBox from "./components/DisplayBox";
import Button from "./components/Button";
import { useState } from "react";

function App() {
  const [displayValue, setDisplayValue] = useState("");
  const [lastOperator, setLastOperator] = useState(""); //value heavily depends on changing value, so need to use state, even if not direct ui element

  const handleOnClick = (buttonText) => {
    // Handle action for = button i.e calculate instead of displaying it
    if (buttonText === "=") {
      const result = eval(displayValue);

      setDisplayValue(String(result));

      return;
    }

    // Handle action for AC [all clear] button
    if (buttonText === "AC") {
      setDisplayValue("");
      return;
    }

    // Handle action for C [clear] button
    if (buttonText === "C") {
      // goal is to remove last character from displayValue string
      const updatedDisplayValue = displayValue.slice(0, -1);
      setDisplayValue(updatedDisplayValue);
      return;
    }

    //   Making sure we only have valid expression for eval
    //1.  Some operators are not allowed in the beginning (%,/,*)
    if (["%", "/", "*"].includes(buttonText)) {
      if (!displayValue) return;
    }

    //2. Do not allow consecutive operators
    if (["%", "/", "*", "+", "-"].includes(buttonText)) {
      const lastCharacter = displayValue.slice(-1);
      // update the last operator
      setLastOperator(buttonText);
      if (["%", "/", "*", "+", "-"].includes(lastCharacter)) {
        // removing last character from display value
        setDisplayValue(displayValue.slice(0, -1));
      }
    }

    //   3.Making sure decimal conditions are correct
    //   Number cannot have consecutive "."
    if (buttonText === ".") {
      // find the current number set, i.e number of operator
      //   Number cannot have 2 .
      const lastOperatorIndex = displayValue.lastIndexOf(lastOperator);
      const currentNumberSet =
        displayValue.slice(lastOperatorIndex) || displayValue;
      console.log("currentNumberSet", currentNumberSet);

      if (currentNumberSet.includes(".")) {
        return;
      }
    }

    // Logic to Display
    setDisplayValue((prevState) => prevState + buttonText);
  };

  return (
    <div className="wrapper flex">
      <div className="calculator-container">
        {/* <!-- result display box --> */}
        <DisplayBox displayValue={displayValue} />
        {/* <!-- buttons --> */}
        <div className="flex">
          {["AC", "C", "%", "/"].map((value) => (
            <Button
              buttonName={value}
              key={value}
              handleOnClick={handleOnClick}
            />
          ))}
        </div>

        <div className="flex">
          {["9", "8", "7", "*"].map((value) => (
            <Button
              buttonName={value}
              key={value}
              handleOnClick={handleOnClick}
            />
          ))}
        </div>

        <div className="flex">
          {["6", "5", "4", "-"].map((value) => (
            <Button
              buttonName={value}
              key={value}
              handleOnClick={handleOnClick}
            />
          ))}
        </div>

        <div className="flex">
          {["3", "2", "1", "+"].map((value) => (
            <Button
              buttonName={value}
              key={value}
              handleOnClick={handleOnClick}
            />
          ))}
        </div>

        <div className="flex">
          {["0", ".", "="].map((value) => (
            <Button
              buttonName={value}
              key={value}
              handleOnClick={handleOnClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
