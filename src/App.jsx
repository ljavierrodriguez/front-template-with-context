import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import injectContext from './store/AppContext';
import Home from './pages/Home';
import Register from './pages/Register';
import Post from './pages/Post';
import LoanForm from './pages/LoanForm';
import Notification from './pages/Notification';
import Profile from './pages/Profile';
import Proposal from './pages/Proposal';
import Wall from './pages/Wall';
import Publications from './pages/Publications';
import NotificationToast from './components/NotificationToast';
import Loading from './components/loading';

const App = () => {
  return (
    <BrowserRouter>
      <Loading />
      <NotificationToast />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/post" element={<Post />} />
        <Route path="/loan-form" element={<LoanForm />} />
        <Route path="/notification" element={<Notification />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/proposal" element={<Proposal />} />
        <Route path="/wall" element={<Wall />} />
        <Route path="/publications" element={<Publications />} />
      </Routes>
    </BrowserRouter>
  )
}

export default injectContext(App)