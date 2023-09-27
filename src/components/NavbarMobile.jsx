import React from 'react'
import Icon from './Icon'
import { useNavigate } from 'react-router-dom';

const NavbarMobile = ({ title, type, symbol }) => {

    const navigate = useNavigate();

    

    return (
        <nav className="navbar bg-dark w-100 text-center navColor pt-3" data-bs-theme="dark">
            <div className='col-1'>
                <a className='text-white' onClick={() => navigate(-1)} style={{cursor: "pointer"}}><Icon type={type} symbol={symbol}/></a>
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

export default NavbarMobile