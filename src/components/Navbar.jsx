import React from 'react'
import Icon from './Icon'
import { useLocation } from "react-router-dom";

const Navbar = ({ title, type, symbol }) => {
    const location = useLocation();
    const previousPath = location.state?.from || '/'

    return (
        <nav className="navbar bg-dark w-100 text-center navColor" data-bs-theme="dark">
            <div className='col-1'>
                <a href={previousPath} className='text-white'><Icon type={type} symbol={symbol}/></a>
            </div>
            <div className="col-10 d-flex justify-content-center">
                <a className="navbar-brand m-0">{title}</a>
            </div>
            <div className='col-1'>
                <a></a>
            </div>
        </nav>
    )
}

export default Navbar