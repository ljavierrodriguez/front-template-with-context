import React, { useContext } from 'react';
import { Context } from '../store/AppContext';
import { useForm } from "react-hook-form";

const Home = () => {
    const { store, actions } = useContext(Context);
    const { register, handleSubmit, formState: { errors } } = useForm();

    return (
        <div className='container-fluid p-0'>
            <div className='w-100 m-0'>
                <img src="./public/img/wave.png" alt="" className='w-100' height={'60px'} />
            </div>

            <div className='row'>
                <div className='col-12 col-md-6 offset-md-1'>
                    <div className=' offset-4 col-4 col-md-7 offset-md-2 mt-4 mb-2'>
                        <img src="./public/img/logo.png" alt="" className='img-fluid' />
                    </div>

                    <div className='col-md-12 d-none d-sm-none d-md-inline mt-2 mb-2'>
                        <div className='text-white text-center'>
                            <p><i>Somos una plataforma que busca democratizar el acceso a los créditos e impulsar la inversión inteligente. Nos caracterizan la seguridad,  transparencia y responsabilidad financiera con nuestros usuarios. Hoy por hoy FundMate se erige como una fuerza disruptiva en el mundo de las finanzas, empoderando a todos para que tomen el control de sus inversiones y den rienda suelta a su potencial financiero.
                            </i></p>
                        </div>
                    </div>
                </div>
                <div className='col-12 col-md-5 d-flex align-items-center'>
                    <form className="offset-2 offset-md-1 col-8 col-md-10 col-lg-8 offset-lg-2 mt-4 mb-3 mt-md-0 mb-md-4 mr-md-0 ml-md-0" onSubmit={handleSubmit((data) => {console.log(data)})}>
                        <label htmlFor="username" className="form-label text-white">Usuario:</label>
                        <input type="email" {...register("username", {required: 'Debe ingresar su nombre de usuario'})} className="form-control" id="username"></input>
                        <p className='text-danger'>{errors.username?.message}</p>
                        <label htmlFor="password" className="form-label text-white">Contraseña:</label>
                        <input type="password" {...register("password", {required: 'Debe ingresar su contraseña'})} className="form-control" id="password"></input>
                        <p className='text-danger'>{errors.password?.message}</p>
                        <p className='text-center mb-2 text-white'>¿Has olvidado tu contraseña?</p>
                        <button type="button" className="btn btn-primary mb-2 w-100 ">Iniciar Sesión</button>
                        <button type="submit" className="btn btn-secondary mb-2 w-100">Crear nueva cuenta</button>
                        <button type="button" className="btn btn-light mb-2 w-100"><span><img src="./public/img/logogoogle.png" height={"30px"} /></span>Iniciar sesión con Google</button>
                    </form>
                </div>


            </div>

            <footer className='container-fluid bg-primary text-center'>
                <p className='m-0 fs-6'>Copyright © Jermain Chacón, Ryan Daniels y Genesis Longart</p>
            </footer>

        </div>
    )
}

export default Home