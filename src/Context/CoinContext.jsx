import { createContext, useEffect, useState } from "react";

export const CoinContex = createContext();

const CoinContextProvider = (props) => {
  

  const [allCoin, setAllCoin] = useState([]);
  const [currency, setCurrency] = useState({
    name: "usd",
    symbol: "$",
  });

  const contextValue = {
    allCoin , currency , setCurrency
  };

  const fetchAllCoin = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "CG-JcDnK3K3pHgs2E3tquBBrJ4K",
      },
    };

    fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`,
      options
    )
      .then((response) => response.json())
    //   .then((response) => console.log(response))
      .then((response) => setAllCoin(response))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchAllCoin();
  },[currency]);
  return (
    <CoinContex.Provider value={contextValue}>
      {props.children}
    </CoinContex.Provider>
  );
};

export default CoinContextProvider;
