import React, { useContext } from 'react'
import { Context } from '../store/AppContext'

const Home = () => {
    const { store, actions } = useContext(Context);

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <h3><i className="fa-solid fa-home fa-1x"></i> Home</h3>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <span className='m-2 text-danger'>
                        {store?.name}
                    </span>

                    <button className="btn btn-info" onClick={actions.greetings}>
                        Saludar
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Home