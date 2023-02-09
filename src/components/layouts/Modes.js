import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { wordleAction } from "../../store/wordle-slice";

const Modes = ({ regenerate }) => {
  const NUMBER_OF_ROWS = useSelector((state) => state.wordle.NUMBER_OF_ROWS);
  const dispatch = useDispatch();
  const modeArr = [
    { name: "beginner", num: 4 },
    { name: "intermediate", num: 5 },
    { name: "advanced", num: 6 },
    { name: "ninja", num: 7 },
  ];

  const changeModeHandler = (num) => {
    // console.log(typeof +e.target.innerText);
    if (num !== NUMBER_OF_ROWS) {
      dispatch(wordleAction.changeMode(num));
      regenerate();
    }
  };

  return (
    <div className="modes">
      <h5>Select Modes</h5>
      {modeArr.map((m) => (
        <button
          className={m.num === NUMBER_OF_ROWS ? `${m.name} modeActive` : m.name}
          onClick={() => changeModeHandler(m.num)}
          key={m.num}
        >
          {m.name}
        </button>
      ))}
    </div>
  );
};

export default Modes;
