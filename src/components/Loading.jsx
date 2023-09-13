import React, { useContext } from "react";
import { Context } from "../store/AppContext";
import LoadingSpinner from "./LoadingSpinner.jsx";
import "../css/loadingOverlay.css"

const Loading = () => {

    const { store } = useContext(Context);

    return (
        <>
            <div>
                {/* Conditionally render the loading overlay and spinner */}
                {store.loading && (
                    <div className="overlay">
                        <LoadingSpinner />
                    </div>
                )}
            </div>
        </>
    )
}

export default Loading;