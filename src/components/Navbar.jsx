import React from 'react'
import Icon from './Icon'

const Navbar = ({ title, type, symbol }) => {
    return (
        <nav className="navbar bg-dark w-100 text-center navColor" data-bs-theme="dark">
            <div className='col-1'>
                <a className='text-white'><Icon type={type} symbol={symbol}/></a>
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