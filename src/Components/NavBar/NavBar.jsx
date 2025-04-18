import React, { useContext, useEffect } from "react";
import { IoMoonOutline } from "react-icons/io5";
import "./NavBar.css";
import { CoinContex } from "../../Context/CoinContext";
import { Link } from "react-router-dom";
import { GoSun } from "react-icons/go";

const NavBar = ({theme,setTheme}) => {

  const toggleTheme = ()=>{
    theme === 'dark' ? setTheme('light') : setTheme('dark');
  }
  const { setCurrency, currency } = useContext(CoinContex);

  const CurrencyChange = (event) => {
    // console.log(event.target.value)
    switch (event.target.value) {
      case "USD": {
        setCurrency({
          name: "usd",
          symbol: "$",
        });
        break;
      }

      case "INR": {
        setCurrency({
          name: "inr",
          symbol: "₹",
        });
        break;
      }
      case "EUR": {
        setCurrency({
          name: "eur",
          symbol: "€",
        });
        break;
      }
      default: {
        setCurrency({
          name: "usd",
          symbol: "$",
        });
        break;
      }
    }
  };

  // useEffect(()=>{
  //   console.log(theme)
  // },[theme]);

  return (
    <div className="container">
      <div className={theme === 'dark' ? "navbar" : "light-mode-navbar"}>
        <Link to={"/"}>
          <h2>
            Coin<span>W</span>atch
          </h2>
        </Link>
        <ul> <Link to={"/"}>
          <li>Home</li>
          </Link>
          <li>Features</li>
          <li>Pricing</li>
          <li>About</li>
        </ul>
        <div className="nav-right">
          <select onChange={CurrencyChange} className={theme==='light'?'light-select':null}>
            <option className="usd">USD</option>
            <option className="inr">INR</option>
            <option className="eur">EUR</option>
          </select>
          <div className="mode" onClick={toggleTheme}>

            {theme === 'dark' ? <GoSun /> : <IoMoonOutline />}
           
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
