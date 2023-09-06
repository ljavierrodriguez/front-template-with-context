import React from 'react'
import Navbar from '../components/Navbar'
import NotificationMessage from '../components/NotificationMessage'

const Notification = () => {
    return (
        <div className='d-flex flex-column align-items-center'>
            <Navbar title={'Notificación'} />
            <NotificationMessage />

            <button type="button" className="btn btn-primary py-2 w-75 position-absolute bottom-0 mb-2">Listo</button>
        </div>
    )
}

export default Notification