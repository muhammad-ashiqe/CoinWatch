import React, { useContext, useEffect, useState } from "react";
import "./Home.css";
import { CoinContex } from "../../Context/CoinContext";
import { Link } from "react-router-dom";

const Home = ({theme,setTheme}) => {
  const { allCoin, currency } = useContext(CoinContex);
  const [DisplayCoin,setDisplayCoin] = useState([]);

 

  useEffect(() => {
    setDisplayCoin(allCoin);
  },[allCoin]);

 

  const [input,setInput] = useState('');

  const inputHandler =(event)=>{
    setInput(event.target.value);
    if(event.target.value === ''){
      setDisplayCoin(allCoin);
    }
  }

  const searchHandler =async (event)=>{
    event.preventDefault();
      const coins =await allCoin.filter((item)=>{
        return  item.name.toLowerCase().includes(input.toLowerCase())
      })
      setDisplayCoin(coins);
  }


  return (
    <div>
      <div className=''>
        <div className="hero">
          <h1>
            Watch Your <span>Coin</span>
          </h1>
          <p>
            Stay Ahead of the Market with Real-Time Crypto Prices. Find, Track,
            and Optimize Your Investments with Our Advanced Price Finding
            Platform
          </p>
          <form onSubmit={searchHandler} className="search-container" name="search" id="search">
            <input onChange={inputHandler} value={input} type="text" placeholder="Search your coin here " required/>
            <button>Search</button>
          </form>
        </div>
        <div className={theme === 'dark' ?"crypto-table" :'light-crypto-table '}>
          <div className="table-layout">
            <p>#</p>
            <p>Coin</p>
            <p>Price</p>
            <p style={{ textAlign: "center" }}>24H change</p>
            <p className="market-cap">Market Cap</p>
          </div>
          {DisplayCoin.slice(0,10).map((item, index) => (
            <Link to={`/coin/${item.id}`} className="table-layout" key={index}>
              <p>{item.market_cap_rank}</p>
              <div className="">
                <img src={item.image} alt="" />
                <p>{item.name + " - " + item.symbol }</p>
              </div>
              <p>{currency.symbol + " " + item.current_price.toLocaleString()}</p>
              <p style={{ textAlign: "center" }} className={item.price_change_percentage_24h>0 ? "green" : "red"}>{Math.floor(item.price_change_percentage_24h*100)/100}</p>
              <p className="market-cap">{currency.symbol}{ item.market_cap.toLocaleString()}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
