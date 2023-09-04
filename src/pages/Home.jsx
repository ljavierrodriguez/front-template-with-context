import React, { useContext } from 'react'
import { Context } from '../store/AppContext'

const Home = () => {
    const { store, actions } = useContext(Context);

    return (
        <div className='d-flex flex-column align-items-center'>
            <img src="./public/img/wave.png" alt="" className='container-fluid m-0' />
            <img src="./public/img/logo.png" alt="" className='w-25' />
            
            <div className="col-4 d-flex flex-column justify-content-center mt-5">
                <label for="username" className="form-label text-white">Usuario:</label>
                <input type="email" className="form-control text-white" id="username"></input>
                <label for="password" className="form-label text-white">Contraseña:</label>
                <input type="email" className="form-control text-white" id="password"></input>
                <p className='text-center mb-5 text-white'>¿Has olvidado tu contraseña?</p>
            </div>
            <div className='d-flex flex-column'>
            <button type="button" className="btn btn-primary mb-2 ">Iniciar Sesión</button>
            <button type="button" className="btn btn-secondary mb-2">Crear nueva cuenta</button>
            <button type="button" className="btn btn-light mb-2"><span><img src="./public/img/logogoogle.png" height={"30px"}/></span>Iniciar sesión con Google</button>
            </div>

            <footer className='container-fluid bg-primary p-3 text-center'>
                <p>Copyright © Jermain Chacón, Ryan Daniels y Genesis Longart</p>
            </footer>

        </div>
    )
}

export default Home