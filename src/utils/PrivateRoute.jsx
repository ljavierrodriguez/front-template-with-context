import React, { useContext } from 'react';
import { Outlet, Navigate } from "react-router-dom"
import { Context } from '../store/AppContext';

const PrivateRoute = () => {
    const { actions } = useContext(Context);

    if (!actions.hasAccessToken()) {
        return <Navigate to="/" />;
    }

    return <Outlet />;
};

export default PrivateRoute;
