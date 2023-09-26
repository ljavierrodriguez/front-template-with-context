import React, { useContext, useState } from 'react';
import { Context } from '../store/AppContext';
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "../css/typewriterAnimation.css";

const Home = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    // const { register, handleSubmit, formState: { errors } } = useForm();
    const { register, handleSubmit: reactHookFormSubmit, formState: { errors } } = useForm();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    //could do this with either form data or state
    const handleLogin = async () => {

        // Create the final payload
        const payload = {
            username: username,
            password: password,
        };

        const loginResult = await actions.logInUser(payload);

        if (loginResult) {
            navigate('/wall');
        }
    }

    return (
        <div className='container-fluid p-0'>
            <div className='w-100 m-0'>
                <img src="/img/wave.png" alt="" className='w-100' height={'60px'} />
            </div>

            <div className='row w-100'>
                <div className='col-12 col-md-6 p-3'>
                    <div className=' offset-4 col-4 col-md-7 offset-md-2 mt-4 mb-2'>
                        <img src="/img/logo.png" alt="" className='img-fluid' />
                    </div>

                    <div className='col-md-12 d-none d-sm-none d-md-inline mt-2 mb-2'>
                        <div className='text-white text-center'>
                            <span class="typewriter" style={{ '--n': 1000 }}> Somos una plataforma que busca democratizar el acceso a los créditos e impulsar la inversión inteligente. Nos caracterizan la seguridad,  transparencia y responsabilidad financiera con nuestros usuarios. Hoy por hoy FundMate se erige como una fuerza disruptiva en el mundo de las finanzas, empoderando a todos para que tomen el control de sus inversiones y den rienda suelta a su potencial financiero.</span>
                        </div>
                    </div>
                </div>
                <div className='col-12 col-md-6 align-items-center justify-content-center p-3'>
                    <div className="row m-0" style={{ height: "65%" }}>
                        {/* Login Form */}
                        <div className="col-12 col-md-10 d-flex flex-column align-items-center justify-content-center pt-2 pb-2 ps-5 pe-5 p-md-0">
                            <form className="w-100 p-3" onSubmit={reactHookFormSubmit(handleLogin)}>
                                <label htmlFor="username" className="form-label text-white">Usuario:</label>
                                <input type="text" {...register("username", { required: 'Debe ingresar su nombre de usuario' })} className="form-control bg-transparent text-light" id="username" onChange={(e) => setUsername(e.target.value)}></input>
                                <p className='text-danger'>{errors.username?.message}</p>
                                <label htmlFor="password" className="form-label text-light">Contraseña:</label>
                                <input type="password" {...register("password", { required: 'Debe ingresar su contraseña' })} className="form-control bg-transparent text-light" id="password" onChange={(e) => setPassword(e.target.value)}></input>
                                <p className='text-danger'>{errors.password?.message}</p>
                                <p className='text-center mb-2 text-white'>¿Has olvidado tu contraseña?</p>
                                <button type="submit" className="btn btn-primary mb-2 w-100">Iniciar Sesión</button>
                            </form>
                        </div>
                    </div>
                    <div className="row m-0" style={{ height: "35%" }}>
                        {/* Buttons */}
                        <div className="col-12 col-md-10 d-flex flex-column align-items-center justify-content-center pt-2 pb-5 ps-5 pe-5 p-md-0">
                            <button type="submit" className="btn btn-secondary mb-2 w-100" onClick={() => navigate('/register')}>Crear nueva cuenta</button>
                            <button type="button" className="btn btn-light mb-2 w-100"><span><img src="/img/logogoogle.png" height={"30px"} /></span>Iniciar sesión con Google</button>
                        </div>
                    </div>
                </div>
            </div>

            <footer className='container-fluid bg-primary text-center p-2'>
                <p className='m-0 fs-6'>Copyright © Jermain Chacón, Ryan Daniels y Genesis Longart</p>
            </footer>

        </div>
    )
}

export default Home