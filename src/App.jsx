import React, { Fragment } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PrivateRoute from './utils/PrivateRoute';
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
import Loading from './components/Loading';

const App = () => {
  return (
    <BrowserRouter>
      <Fragment>
        <Loading />
        <NotificationToast />
        <Routes>
          {/* public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/notification" element={<Notification />} />
          <Route path="*" element={<h1>Not found!</h1>} />

          {/* private routes */}
          <Route path="/wall" element={<PrivateRoute />}>
            <Route path="/wall" element={<Wall />} />
          </Route>
          <Route path="/profile" element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="/publications" element={<PrivateRoute />}>
            <Route path="/publications" element={<Publications />} />
          </Route>
          <Route path="/post" element={<PrivateRoute />}>
            <Route path="/post/:postId" element={<Post />} />
          </Route>
          <Route path="/post/:postId/proposal" element={<PrivateRoute />}>
            <Route path="/post/:postId/proposal" element={<Proposal />} />
          </Route>
          <Route path="/loan-form" element={<PrivateRoute />}>
            <Route path="/loan-form" element={<LoanForm />} />
          </Route>
        </Routes>
      </Fragment>
    </BrowserRouter>
  )
}

export default injectContext(App)