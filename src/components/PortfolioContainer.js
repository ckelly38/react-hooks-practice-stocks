import React from "react";
import Stock from "./Stock";

function PortfolioContainer(props) {
  return (
    <div>
      <h2>My Portfolio</h2>
      {props.children}
    </div>
  );
}

export default PortfolioContainer;
