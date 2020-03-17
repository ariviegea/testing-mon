import React from "react";
import "./index.css";

const Wheel = ({ items, selectItem }) => {
  const wheelVars = {
    "--nb-item": items.length,
    "--selected-item": selectItem
  };

  const spinning = selectItem !== null ? "spinning" : "";

  return (
    <>
      <div className="wheel-container">
        <div className={`wheel ${spinning}`} style={wheelVars}>
          {items.map((item, index) => (
            <div
              className="wheel-item"
              key={index}
              style={{ "--item-nb": index }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Wheel;