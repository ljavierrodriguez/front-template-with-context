import React from 'react'
import Icon from './Icon'

const NotificationMessage = () => {
    return (
        <>
            <div className='d-flex flex-column align-items-center mt-5'>
                <p className='text-white'>
                    Su usuario ha sido creado con éxito.
                </p>

                <div className='display-1 text-success mb-5'>
                    <Icon type={'solid'} symbol={'check'} />
                </div>
            </div>

        </>
    )
}

export default NotificationMessage