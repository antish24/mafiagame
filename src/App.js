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

function App () {
  const {pathname} = useLocation();
  const hideNavbar = ['/','/'];
  const hideChatbar = ['/','/home'];
  const shouldHideNavbar = hideNavbar.includes (pathname);
  const shouldHideChatbar = hideChatbar.includes (pathname);
  return (
    <div className="App">
      <div className="Layout">
      {!shouldHideNavbar && <TopNav/>}
        <Routes>
          <Route element={<LandingPage />} index />
          <Route element={<Home/>} path="/home" />
          <Route element={<Room/>} path="/room/:gamecode" />
          <Route element={<Role/>} path="/role" />
          <Route element={<Game/>} path="/game" />
          <Route element={<PageNotFound />} path="*" />
        </Routes>
        {!shouldHideChatbar && <Chat/>}
      </div>
    </div>
  );
}

export default App;
