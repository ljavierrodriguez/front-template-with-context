import React from 'react'
import Navbar from '../components/Navbar'
import Icon from '../components/Icon'


const Register = () => {
    return (
        <div className='d-flex flex-column justify-content-center align-items-center'>
            <Navbar title={"Registro"} type={'solid'} symbol={'arrow-left'} />
            <form className='p-3 rounded col-10 mt-3'>
                <div className="mb-3">
                    <label htmlFor="full-name" className="form-label text-white">Nombre completo<span className='text-danger'>*</span></label>
                    <input type="email" className="form-control" id="full-name" />
                </div>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label text-white">Nombre de usuario<span className='text-danger'>*</span></label>
                    <input type="password" className="form-control" id="username" />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label text-white">Correo electrónico<span className='text-danger'>*</span></label>
                    <input type="password" className="form-control" id="email" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label text-white">Contraseña<span className='text-danger'>*</span></label>
                    <input type="password" className="form-control" id="password" />
                </div>
                <div className="mb-3">
                    <label htmlFor="phone" className="form-label text-white">Teléfono<span className='text-danger'>*</span></label>
                    <input type="password" className="form-control" id="phone" />
                </div>
                <div className="mb-3">
                    <label htmlFor="bank" className="form-label text-white">Banco<span className='text-danger'>*</span></label>
                    <input type="password" className="form-control" id="bank" />
                </div>
                <div className="mb-3">
                    <label htmlFor="account" className="form-label text-white">Tipo de cuenta<span className='text-danger'>*</span></label>
                    <input type="password" className="form-control" id="account" />
                </div>
                <div className="mb-3">
                    <label htmlFor="accountNumber" className="form-label text-white">Número de cuenta<span className='text-danger'>*</span></label>
                    <input type="password" className="form-control" id="accountNumber" />
                </div>

                <div className='mb-3'>
                    <label htmlFor="idFile" className="form-label text-white">Cédula de identidad<span className='text-danger'>*</span></label>
                    <div className='text-center'>
                        <button className='filesBtn rounded w-75' id='idFile'><Icon type={'solid'} symbol={'cloud-arrow-up'} /><br />Format PDF <br /> <span className='text-primary'>Browse files</span></button>
                    </div>
                </div>
                <div className='mb-3'>
                    <label htmlFor="dicomFile" className="form-label text-white">Informe Dicom<span className='text-danger'>*</span></label>
                    <div className='text-center'>
                        <button className='filesBtn rounded w-75' id='dicomFile'><Icon type={'solid'} symbol={'cloud-arrow-up'} /><br />Format PDF <br /> <span className='text-primary'>Browse files</span></button>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">Registrarme</button>
                <div id="emailHelp" className="form-text text-white">Al hacer click en "Registrarme", aceptas nuestras <span className='text-primary'>condiciones</span> y <span className='text-primary'>políticas de privacidad</span>.</div>
            </form>
        </div>
    )
}

export default Register