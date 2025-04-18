import React, { useContext, useEffect, useState } from "react";
import "./Coin.css";
import { useParams } from "react-router-dom";
import { CoinContex } from "../../Context/CoinContext";
import Linechart from "../../Components/LineCharts/Linechart";

const Coin = () => {
  const { coinId } = useParams();
  const [coinData, setCoinData] = useState();
  const [historicalData, setHistoricalData] = useState();
  const { currency } = useContext(CoinContex);

  const fetchHistoricalData = () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "CG-JcDnK3K3pHgs2E3tquBBrJ4K",
      },
    };

    fetch(
      `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=10&interval=daily`,
      options
    )
      .then((response) => response.json())
      .then((response) => setHistoricalData(response))
      .catch((err) => console.error(err));
  };

  const fetchCoinApi = () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "CG-JcDnK3K3pHgs2E3tquBBrJ4K",
      },
    };

    fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`,options)
      .then((response) => response.json())
      .then((response) => setCoinData(response))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchCoinApi();
    fetchHistoricalData();
  }, [currency]);
  if (coinData && historicalData)
    return (
      <div className="">
        <div className="coin">
          <div className="coin-container">
            <img src={coinData.image.large} alt="" className="coin-img"/>
             <p>
              <b>
                {coinData.name} ({coinData.symbol.toUpperCase()})
              </b>
            </p>
          </div>
         <div className="coin-display">
         <div className="coin-chart">
            <Linechart historicalData={historicalData} />
          </div>

          <div className="coin-info">
            <ul>
              <li>Crypto Market Rank :</li>
              <li>{coinData.market_cap_rank}</li>
            </ul>
            <ul>
              <li>Current Price :</li>
              <li>
                {currency.symbol}{" "}
                {coinData.market_data.current_price[
                  currency.name
                ].toLocaleString()}
              </li>
            </ul>
            <ul>
              <li>Market Cap :</li>
              <li>
                {currency.symbol}{" "}
                {coinData.market_data.market_cap[
                  currency.name
                ].toLocaleString()}
              </li>
            </ul>
            <ul>
              <li>High 24H :</li>
              <li>
                {currency.symbol}{" "}
                {coinData.market_data.high_24h[currency.name].toLocaleString()}
              </li>
            </ul>
            <ul>
              <li>Low 24H :</li>
              <li>
                {currency.symbol}{" "}
                {coinData.market_data.low_24h[currency.name].toLocaleString()}
              </li>
            </ul>
          </div>
         </div>
        </div>
      </div>
    );
  else {
    return (
      <div className="spinner">
        <div className="spin"></div>
      </div>
    );
  }
};

export default Coin;
