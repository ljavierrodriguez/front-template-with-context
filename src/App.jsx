import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import injectContext from './store/AppContext';
import Home from './pages/Home';
import Register from './pages/Register';
import Post from './pages/Post';
import LoanForm from './pages/LoanForm';
import Notification from './pages/Notification';
import Profile from './pages/Profile';

const App = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/post" element={<Post />} />
            <Route path="/loan-form" element={<LoanForm />} />
            <Route path="/notification" element={<Notification />} />
            <Route path="/profile" element={<Profile />} />
        </Routes>
    </BrowserRouter>
  )
}

export default injectContext(App)