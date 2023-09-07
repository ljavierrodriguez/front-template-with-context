import React from 'react';
import Navbar from '../components/Navbar';
import Icon from '../components/Icon';

const Profile = () => {
    return (
        <>
            <Navbar title={'Perfil de usuario'} />
            <div className='mt-3'>
                <div className='p-1 btn_post_choices_wrapper rounded'>
                    <button className='btn_post_choices text-white bg-primary rounded p-2 w-50'>Prestatario</button>
                    <button className='btn_post_choices text-secondary rounded p-2 w-50'>Prestamista</button>
                </div>
                <div className='d-flex justify-content-center text-white mt-3 mb-2'>
                    <span className='text-white display-1'>
                        <Icon type={'solid'} symbol={'user'} />
                    </span>
                    <span className='text-white align-self-baseline fs-5'>
                        <Icon type={'solid'} symbol={'pen-to-square'} />
                    </span>
                </div>
                <div className='mx-4 mt-3'>
                    <div>
                        <p className='text-white m-0'>Nombre completo</p>
                        <span className='text-secondary'>Luis Eduardo López</span>
                    </div>
                    <div>
                        <p className='text-white m-0'>Nombre de usuario</p>
                        <span className='text-secondary'>llopez28</span>
                    </div>
                    <div>
                        <p className='text-white m-0'>Cédula de identificación</p>
                        <span className='text-secondary'>xx.xxx.xxx-x</span>
                    </div>
                    <div>
                        <p className='text-white m-0'>Correo electrónico</p>
                        <span className='text-secondary'>lel28@gmail.com</span>
                    </div>
                    <div>
                        <div className='d-flex justify-content-between align-items-center'>
                            <p className='text-white m-0'>Teléfono</p>
                            <p className='text-white fs-5'>
                                <Icon type={'solid'} symbol={'pen-to-square'} />
                            </p>
                        </div>
                        <p className='text-secondary m-0'>+56 900 00 00 00</p>
                    </div>
                    <div>
                    <div className='d-flex justify-content-between align-items-center'>
                            <p className='text-white m-0'>Datos bancarios</p>
                            <p className='text-white fs-5'>
                                <Icon type={'solid'} symbol={'pen-to-square'} />
                            </p>
                        </div>
                        <span className='text-secondary'>Banco Popular</span>
                        <br />
                        <span className='text-secondary'>Cuenta corrriente</span>
                        <br />
                        <span className='text-secondary'>#00 0000 000000</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile