import NavBar from "./Components/NavBar/NavBar";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Coin from "./Pages/Coin/Coin";
import Footer from "./Components/Footer/Footer";
import { useState } from "react";

function App() {

  const [theme,setTheme] =useState('dark');
  return (
    <div className={theme === 'dark' ?"app" :'light-app'}>
      <NavBar theme={theme} setTheme={setTheme}/>
      <Routes>
        <Route path="/" element={<Home theme={theme} setTheme={setTheme}/>} />
        <Route path="/coin/:coinId" element={<Coin />} />
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
