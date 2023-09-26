import React, { useContext } from "react";
import Navbar from '../components/Navbar'
import { useNavigate } from "react-router-dom";
import { Context } from "../store/AppContext";
import Icon from '../components/Icon'

const Notification = () => {
    const navigate = useNavigate();
    const { store, actions } = useContext(Context);

    const handleNavigation = () => {
        navigate(store.notificationPage.confirmButtonPath);
        actions.resetNotificationPage();
      };

    return (
        <div className='d-flex flex-column align-items-center'>
            <Navbar title={'Notificación'} />
            <div className='d-flex flex-column align-items-center mt-5'>

                {store.notificationPage.message ?
                    <>
                        <p className='text-white'>
                            {store.notificationPage.message}
                        </p>

                        <div className='display-1 text-success mb-5'>
                            <Icon type={'solid'} symbol={'check'} />
                        </div>
                    </> :
                    <>
                        <p className='text-white'>No Notification Message</p>
                    </>
                }
            </div>

            {store.notificationPage.message ?
                <>
                    <button type="button" className="btn btn-primary py-2 w-75 position-absolute bottom-0 mb-5" onClick={handleNavigation}>{store.notificationPage.confirmButtonText}</button>
                </> :
                <>
                    <button type="button" className="btn btn-primary py-2 w-75 position-absolute bottom-0 mb-5" onClick={() => navigate('/')}>Go Back</button>
                </>
            }
        </div>
    )
}

export default Notification