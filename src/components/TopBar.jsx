import React from 'react';
import Icon from './Icon';
import { Link } from 'react-router-dom';

const TopBar = () => {

    return (
        <>
            <div className='d-none pb-3 pt-3 text-white fs-4 d-md-flex align-items-center justify-content-between'>
                <div>
                    <Link to="/wall">
                        <img src='../public/img/logo.png' height={'70px'} />
                    </Link>
                </div>
                <div>
                    <Icon type={'solid'} symbol={'bell'} />
                </div>
            </div>
        </>
    )
}

export default TopBar