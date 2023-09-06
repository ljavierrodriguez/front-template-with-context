import React from 'react'
import Navbar from '../components/Navbar'
import Icon from '../components/Icon'
const Post = () => {
    return (
        <>
            <Navbar />
            <div className='d-flex flex-column justify-content-center align-items-center postWrapper mt-2'>
                <div className='userDiv text-white text-center display-1 col-3'>
                    <Icon type={'solid'} symbol={'user'} />
                </div>
                <div className='text-center mt-2 pb-3 border-bottom border-secondary col-10'>
                    <p className='text-white fw-bold m-0'>Juan Soto</p>
                    <p className='text-secondary m-0'>juanS34</p>
                    <div className='text-center'>
                        <span className='post_details_spn text-primary rounded'>6 transacciones</span> <span className='post_details_spn text-primary rounded'>Negocicable</span>
                    </div>
                </div>
                <div className='mt-3'>
                    <div className='p-1 btn_post_choices_wrapper rounded'>
                        <button className='btn_post_choices text-white bg-primary rounded'>Descripción</button>
                        <button className='btn_post_choices text-secondary rounded'>Propuesta</button>
                    </div>
                </div>
            </div>
            <div className='conditions_wrapper'>
                <div className='text-white post_requirements post_conditions'>
                    <p className=''>Condiciones:</p>
                    <ul>
                        <li>Un requerimiento</li>
                        <li>Otro requerimiento</li>
                        <li>Y requerimiento más</li>
                    </ul>
                </div>


                <footer className='text-center post_footer pb-3'>
                    <button type="button" class="btn btn-primary w-75 py-2">Solicitar crédito</button>
                </footer>
            </div>

        </>
    )
}

export default Post