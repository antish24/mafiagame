import {Route, Routes} from 'react-router-dom';
import './App.css';
import PageNotFound from './pages/404/PageNotFound';
import LandingPage from './pages/Landing/LandingPage';
import Home from './pages/Home/Home';
import TopNav from './components/TopNav/TopNav';
import {useLocation} from 'react-router-dom'
import Room from './pages/Room/Room';
import Chat from './components/chat/Chat';
import Game from './pages/Game/Game';
import Role from './pages/Role/Role';
import io from 'socket.io-client';
import { useEffect } from 'react';
import { BACKENDURL } from './helper/Url';
import Account from './pages/Account/Account';

const socket = io(BACKENDURL);

function App () {

useEffect(() => {
  socket.on('connect', () => {
    console.log('Connected to the server');
  });

  socket.on('disconnect', () => {
    console.log('Disconnected from the server');
  });

}, []);
  const {pathname} = useLocation();
  const hideNavbar = ['/','/'];
  const hideChatbar = ['/','/home','/account'];
  const shouldHideNavbar = hideNavbar.includes (pathname);
  const shouldHideChatbar = hideChatbar.includes (pathname);
  return (
    <div className="App">
      <div className="Layout">
      {!shouldHideNavbar && <TopNav/>}
        <Routes>
          <Route element={<LandingPage />} index />
          <Route element={<Home socket={socket}/>} path="/home" />
          <Route element={<Room socket={socket}/>} path="/room/:gamecode" />
          <Route element={<Role socket={socket}/>} path="/role" />
          <Route element={<Game socket={socket}/>} path="/game" />
          <Route element={<Account socket={socket}/>} path="/account" />
          <Route element={<PageNotFound />} path="*" />
        </Routes>
        {!shouldHideChatbar && <Chat socket={socket}/>}
      </div>
    </div>
  );
}

export default App;


