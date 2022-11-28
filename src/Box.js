import React from "react";
import './Box.css';

function Box ({ index, turn, value }) {
  return (
    <div className="box" onClick={() => turn(index)}>
      {value}
    </div>
  );
};

export default Box;