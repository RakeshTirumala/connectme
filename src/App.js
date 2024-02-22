import { Route, Routes } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/loginPage';
import ExplorePage from './pages/ExplorePage';
import NavbarComponent from './components/navbarComponent';
import NetworkPage from './pages/networkPage';
import SettingsPage from './pages/SettingsPage';
import MessengerPage from './pages/messengerPage';
import { useState } from 'react';
import ProfilePage from './pages/profilePage';

function App() {
  const[bgTheme, setBgTheme] = useState('white');
  const handleBG=(childData)=>{
    (childData)?setBgTheme('black'):setBgTheme('white')
    // if(bgTheme==='black') document.getElementById('root').style.backgroundColor = 'black'
    // else document.getElementById('root').style.backgroundColor = 'white'
    // console.log("theme:", bgTheme)
  }
  return (
    <Routes>
      <Route path='/' element={<LoginPage/>}/>
      <Route path='explore' element={<ExplorePage background={bgTheme}/>}/>
      <Route path='/network' element={<NetworkPage background={bgTheme}/>}/>
      <Route path='/settings' element={<SettingsPage bgTheme = {handleBG}/>}/>
      <Route path='/profile' element={<ProfilePage/>}/>
      <Route path='/messenger' element={<MessengerPage/>}/>
    </Routes>
  );
}

export default App;
