import React from "react";

function Stock({name, tkrnm, price}) {
  function handleClick(event)
  {
    //do something here...
  }

  return (
    <div>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <p className="card-text">{tkrnm} : {price}</p>
        </div>
      </div>
    </div>
  );
}
export default Stock;
