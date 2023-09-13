import React, { useState, useContext } from "react";
import { Button, Toast, ToastBody, ToastHeader } from 'reactstrap';
import { Context } from "../store/AppContext";

const NotificationToast = () => {

    const { store, actions } = useContext(Context);

    return (
        <>
            <div className="position-fixed bottom-0 end-0 p-3" style={{ zIndex: 11 }}>
                {actions.getNotifications().map((toast) => (
                    <Toast key={toast.id} onClose={() => actions.removeNotification(toast.id)}>
                        <ToastHeader icon={toast.notificationType}>
                            <img src="..." className="rounded me-2" alt="" />
                            <strong className="me-auto">API Response </strong>
                            <small>{toast.time}</small>
                            <Button close onClick={() => actions.removeNotification(toast.id)} />
                        </ToastHeader>
                        <ToastBody>
                            {toast.message}
                        </ToastBody>
                    </Toast>
                ))}
            </div>
        </>
    )
}

export default NotificationToast;