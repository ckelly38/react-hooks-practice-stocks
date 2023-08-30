import React, { useState, useEffect } from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "./SearchBar";
import Stock from "./Stock";

function MainContainer() {
  const [allstocks, setAllStocks] = useState([]);
  const [ismine, setIsMine] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [query, setQuery] = useState("Tech");
  const [order, setSortBy] = useState("ID");//ID, PRICE, ALPHABET
  function changeQuery(nqry)
  {
    if (nqry === undefined || nqry === null) throw new Error("new query must be defined!");
    else setQuery(nqry);
  }

  useEffect(() => {
    fetch("http://localhost:3001/stocks").then((response) => response.json()).then((response) => {
      console.log("response = ", response);
      setAllStocks(response);
      setIsMine(response.map(() => false));
      setIsLoaded(true);
    }).catch((err) => {
      console.error("there was a problem getting the stocks from the server!");
      console.error(err);
      alert("failed to get the list of stocks from the server! See log!");
    });
  }, []);
  console.log("allstocks = ", allstocks);
  console.log("ismine = ", ismine);
  console.log("isLoaded = " + isLoaded);
  console.log("order = " + order);

  //generate the stocks needed in the stock container here
  //generate the stocks needed in the portfolio container here
  //most of the functions and functionality are the same...
  function myStringComparator(stra, strb)
  {
      //mya, myb
      //0, myb
      if (isNaN(stra) == isNaN(strb))
      {
          if (isNaN(stra));
          else
          {
              if (stra == undefined || stra == null)
              {
                  if (strb == undefined || strb == null) return 0;
                  else return -1;
              }
              else
              {
                  if (strb == undefined || strb == null) return 1;
                  else
                  {
                      let mynuma = Number(stra);
                      let mynumb = Number(strb);
                      if (mynuma < mynumb) return -1;
                      else if (mynumb < mynuma) return 1;
                      else return 0;
                  }
              }
          }
      }
      else
      {
          if (isNaN(stra)) return -1;
          else return 1;
      }

      if (stra.length == strb.length);
      else
      {
          if (stra.length < 1)
          {
              if (strb.length < 1) return 0;
              else return -1;
          }
          else
          {
              if (strb.length < 1) return 1;
              //else;//do nothing
          }
      }

      for (let n = 0; n < stra.length; n++)
      {
          //let mychara = stra.charAt(n);
          //let mycharb = '';
          let mycodeb = -1;
          if (n < strb.length)
          {
              //mycharb = strb.charAt(n);
              mycodeb = strb.charCodeAt(n);
          }
          //else;//do nothing

          let mycodea = stra.charCodeAt(n);
          if (mycodea < mycodeb) return -1;
          else if (mycodea == mycodeb);
          else return 1;
      }
      return 0;
  }

  function mySortCmptr(a, b)
  {
      //1 a moves on
      //-1 b moves on
      //0 otherwise

      if (a == undefined || a == null)
      {
          if (b == undefined || b == null) return 0;
          else return -1;
      }
      else
      {
          if (b == undefined || b == null) return 1;
          //else;//do nothing proceed below
      }

      if (isNaN(a) || isNaN(b))
      {
          if (isNaN(a) == isNaN(b))
          {
              //they both are nan
              return myStringComparator("" + a, "" + b);
          }
          else
          {
              if (isNaN(a)) return -1;
              else return 1;
          }
      }
      else
      {
          let mynuma = Number(a);
          let mynumb = Number(b);
          if (mynuma < mynumb) return -1;
          else if (mynumb < mynuma) return 1;
          else return 0;
      }
  }
  function testMySortComparator(){
      console.log("null < 2: " + mySortCmptr(null, 2));
      console.log("2 > null: " + mySortCmptr(2, null));
      console.log("1 == 1: " + mySortCmptr(1, 1));
      console.log("1 < 2: " + mySortCmptr(1, 2));
      console.log("1.2 < 2: " + mySortCmptr(1.2, 2));
      console.log("1.2 < 1.1: " + mySortCmptr(1.2, 1.1));
      console.log("8 < 33: " + mySortCmptr(8, 33));
      console.log("33 < 39: " + mySortCmptr(33, 39));
      console.log("mya < 2: " + mySortCmptr("mya", 2));
      console.log("mya < myb: " + mySortCmptr("mya", "myb"));
  }
  
  function isABeforeBIfUndefinedOrNull(a, b)
  {
    if (a == undefined || a == null)
    {
        if (b == undefined || b == null) return 0;
        else return -1;
    }
    else
    {
        if (b == undefined || b == null) return 1;
        else throw new Error("they must be undefined or null!");
    }
  }

  function myIdCmptr(a, b)
  {
    if (a == undefined || a == null || b == undefined || b == null)
    {
      return isABeforeBIfUndefinedOrNull(a, b);
    }
    else return mySortCmptr(a.id, b.id);
  }
  function myPriceCmptr(a, b)
  {
    if (a == undefined || a == null || b == undefined || b == null)
    {
      return isABeforeBIfUndefinedOrNull(a, b);
    }
    else return mySortCmptr(a.price, b.price);
  }
  function myNameCmptr(a, b)
  {
    if (a == undefined || a == null || b == undefined || b == null)
    {
      return isABeforeBIfUndefinedOrNull(a, b);
    }
    else return mySortCmptr(a.name, b.name);
  }
  function myTickerNameCmptr(a, b)
  {
    if (a == undefined || a == null || b == undefined || b == null)
    {
      return isABeforeBIfUndefinedOrNull(a, b);
    }
    else return mySortCmptr(a.ticker, b.ticker);
  }
  //testMySortComparator();

  //first sort them by order (ID, ALPHABET, PRICE)
  //then filter them by query
  //then filter them by aremine (if it is mine, not listed here)

  function mapsrtcb(stock, qstocks)
  {
    console.log("stock = ", stock);
    console.log("qstocks = ", qstocks);
    if (stock === undefined || stock === null)
    {
      throw new Error("stock must be defined and not null!");
    }
    //else;//do nothing

    if (qstocks === undefined || qstocks === null || qstocks.length < 1) return null;
    //else;//do nothing

    for (let n = 0; n < qstocks.length; n++)
    {
      if (stock.id === qstocks[n].id) return qstocks[n];
      //else;//do nothing
    }
    throw new Error("the stock must have been on the list, but it was not!");
  }

  function genStocksListForPortfolioOrStockContainer(useismine)
  {
    console.log("useismine = " + useismine);
    console.log("allstocks = ", allstocks);
    console.log("ismine = ", ismine);
    let myqstocks = null;
    let mysrtedqstocks = null;
    let myretstocks = null;
    if (allstocks === undefined || allstocks === null || allstocks.length < 1);
    else
    {
      myqstocks = allstocks.filter((stock, index) => (useismine === ismine[index]))
        .filter((stock) => (stock.type === query));
      
      let myqsrtdbyidstocksonly = null;
      let myqsrtdbypricestocksonly = null;
      let myqsrtdbynamestocksonly = null;
      if (order === undefined || order === null || order === "ID")
      {
        myqsrtdbyidstocksonly = myqstocks.map((stock) => stock);
        myqsrtdbyidstocksonly.sort(myIdCmptr);
      }
      else
      {
        if (order === "ALPHABET")
        {
          myqsrtdbynamestocksonly = myqstocks.map((stock) => stock);
          //myqsrtdbynamestocksonly.sort(myNameCmptr);
          myqsrtdbynamestocksonly.sort(myTickerNameCmptr);
        }
        else if (order === "PRICE")
        {
          myqsrtdbypricestocksonly = myqstocks.map((stock) => stock);
          myqsrtdbypricestocksonly.sort(myPriceCmptr);
        }
        else throw new Error("illegal value sorted by!");
      }
    
      if (myqsrtdbyidstocksonly === null)
      {
        if (myqsrtdbynamestocksonly === null)
        {
          if (myqsrtdbypricestocksonly === null)
          {
            throw new Error("all of the lists should not be empty, but they were!");
          }
          else mysrtedqstocks = myqsrtdbypricestocksonly.map((stock) => mapsrtcb(stock, myqstocks));
        }
        else mysrtedqstocks = myqsrtdbynamestocksonly.map((stock) => mapsrtcb(stock, myqstocks));
      }
      else mysrtedqstocks = myqsrtdbyidstocksonly.map((stock) => mapsrtcb(stock, myqstocks));

      myretstocks = mysrtedqstocks.map((stockobj) => {
        return (
          <Stock key={stockobj.id} name={stockobj.name} tkrnm={stockobj.ticker}
          price={stockobj.price} onclick={null} />
        );
      });
    }
    return myretstocks;
  }
  function genStocksListForPortfolioContainer()
  {
    return genStocksListForPortfolioOrStockContainer(true);
  }
  function genStocksListForStockContainer()
  {
    return genStocksListForPortfolioOrStockContainer(false);
  }

  


  if (isLoaded)
  {
    return (
      <div>
        <SearchBar query={query} order={order} setorder={setSortBy} setquery={changeQuery} />
        <div className="row">
          <div className="col-8">
            <StockContainer>{genStocksListForStockContainer()}</StockContainer>
          </div>
          <div className="col-4">
            <PortfolioContainer>{genStocksListForPortfolioContainer()}</PortfolioContainer>
          </div>
        </div>
      </div>
    );
  }
  else return ( <div>Loading...</div> );
}

export default MainContainer;
