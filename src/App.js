import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/loginPage";
import ExplorePage from "./pages/ExplorePage";
import NetworkPage from "./pages/networkPage";
import SettingsPage from "./pages/SettingsPage";
import MessengerPage from "./pages/messengerPage";
import { useState } from "react";
import ProfilePage from "./pages/profilePage";
import SignUp from "./pages/signupPage";

function App() {
  const darkColor = '#1e2124'
  const [bgTheme, setBgTheme] = useState("white");
  const [fontColor, setFontColor] = useState("black");
  const [themeData, setThemeData] = useState(false);
  const handleBG = (childData) => {
    childData ? setBgTheme(darkColor) : setBgTheme("white");
    childData ? setFontColor("white") : setFontColor("black");
    // if(bgTheme==='black') document.getElementById('root').style.backgroundColor = 'black'
    // else document.getElementById('root').style.backgroundColor = 'white'
    // console.log("theme:", bgTheme)
  };

  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="explore" element={<ExplorePage background={bgTheme} fontColor={fontColor} />} />
      <Route path="/network" element={<NetworkPage background={bgTheme} fontColor={fontColor} />} />
      <Route path="/settings" element={<SettingsPage background={bgTheme} handleBG={handleBG} themeData={themeData} fontColor={fontColor} />} />
      <Route path="/profile" element={<ProfilePage background={bgTheme} fontColor={fontColor} />} />
      <Route path="/messenger" element={<MessengerPage background={bgTheme} fontColor={fontColor} />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
}

export default App;
