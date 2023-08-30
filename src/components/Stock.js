import React from "react";

function Stock({name, tkrnm, price, mid, onclick}) {
  function handleClick(event)
  {
    //console.log("event.target = ", event.target);//h5 element
    //console.log("event.target.parentNode.parentNode.parentNode = ",
    //  event.target.parentNode.parentNode.parentNode);
    const mid = event.target.parentNode.parentNode.parentNode.id;
    //console.log("mid = " + mid);
    onclick(mid);
  }

  return (
    <div id={mid} onClick={handleClick}>
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
