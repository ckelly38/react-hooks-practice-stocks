import React from "react";
import Stock from "./Stock";

function StockContainer(props) {
  return (
    <div>
      <h2>Stocks</h2>
      {props.children}
    </div>
  );
}

export default StockContainer;
