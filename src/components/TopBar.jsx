import React from 'react';
import Icon from './Icon';

const TopBar = () => {
    return (
        <>
            <div className='d-none pb-3 pt-3 text-white fs-4 d-md-flex align-items-center justify-content-between'>
                <div>
                    <img src='../public/img/logo.png' height={'70px'} />
                </div>
                <div>
                    <Icon type={'solid'} symbol={'bell'} />
                </div>
            </div>
        </>
    )
}

export default TopBar