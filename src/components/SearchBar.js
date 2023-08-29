import React from "react";

function SearchBar({order, setorder, query, setquery}) {
  let usealphabet = false;
  let useprice = false;
  if (order === undefined || order === null || order === "ID");
  else
  {
    if (order === "PRICE")
    {
      useprice = true;
      usealphabet = false;
    }
    else if (order === "ALPHABET")
    {
      usealphabet = true;
      useprice = false;
    }
    else throw new Error("illegal order (" + order + ") found and used here!");
  }
  //console.log("init usealphabet = " + usealphabet);
  //console.log("init useprice = " + useprice);

  function onFilterChange(event)
  {
    setquery(event.target.value);
  }
  function onCheckedChange(event)
  {
    //console.log("event.target.value = " + event.target.value);
    //console.log("OLD usealphabet = " + usealphabet);
    //console.log("OLD useprice = " + useprice);
    let tempnewusealpha = false;
    if (event.target.value === "Alphabetically" || event.target.value === "Price")
    {
      tempnewusealpha = (usealphabet === false);
    }
    else throw new Error("illegal value found and used for the target radio button!");
    //console.log("tempnewusealpha = " + tempnewusealpha);
    
    if (tempnewusealpha)
    {
      usealphabet = true;
      useprice = false;
      setorder("ALPHABET");
    }
    else
    {
      useprice = true;
      usealphabet = false;
      setorder("PRICE");
    }
    //console.log("NEW usealphabet = " + usealphabet);
    //console.log("NEW useprice = " + useprice);
  }

  return (
    <div>
      <strong>Sort by:</strong>
      <label>
        <input
          type="radio"
          value="Alphabetically"
          name="sort"
          checked={usealphabet}
          onChange={onCheckedChange}
        />
        Alphabetically
      </label>
      <label>
        <input
          type="radio"
          value="Price"
          name="sort"
          checked={useprice}
          onChange={onCheckedChange}
        />
        Price
      </label>
      <br />
      <label>
        <strong>Filter:</strong>
        <select onChange={onFilterChange} value={query}>
          <option value="Tech">Tech</option>
          <option value="Sportswear">Sportswear</option>
          <option value="Finance">Finance</option>
        </select>
      </label>
    </div>
  );
}

export default SearchBar;
