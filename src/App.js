import React, { useEffect } from "react";
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
  const darkColor = '#282b30'
  const [bgTheme, setBgTheme] = useState(null);
  const [fontColor, setFontColor] = useState(null);
  const [themeData, setThemeData] = useState(null);

  useEffect(()=>{
    handleBG()
  },[])

  const handleBG = (childData) => {

    console.log("The child item is",childData)
    childData ? setBgTheme(darkColor) : setBgTheme("white");
    childData ? setFontColor("white") : setFontColor("black");
    childData ? setThemeData(true):setThemeData(false);

    console.log("Theme", bgTheme, "FontColor", fontColor)
  };

  return (
    <Routes>
      <Route path="/" element={<LoginPage handleBG={handleBG}/>}/>
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
