import React from "react";
import { Icon } from "semantic-ui-react";

const CircularRate = ({ value }) => {

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row-reverse",
        marginBottom:"5px"
      }}
    >
      <div style={{ width: "10px", height: "10px" }}>
        <div style={{fontSize:"15px"}}>{(value * 10).toFixed(1)}</div>
      </div>
      <Icon name="star" color="yellow" size="large" />
    </div>
  );
};

export default CircularRate;
