import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Icon from '../components/Icon'


const Register = () => {

    const [fullName, setFullname] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [bank, setBank] = useState('');
    const [account, setAccount] = useState('');
    const [accountNumber, setAccountNumber] = useState('');

    return (
        <div className=''>
            <Navbar title={"Registro"} type={'solid'} symbol={'arrow-left'} />

            <div className='row'>
                <div className='d-none d-md-inline col-md-6'>

                </div>
                <div className='col-12 col-md-5 d-flex justify-content-center'>
                    <form className='p-3 rounded col-10 col-md-12 mt-3'>
                        <div className="mb-3">
                            <label htmlFor="full-name" className="form-label text-white">Nombre completo<span className='text-danger'>*</span></label>
                            <input type="text" className="form-control" id="full-name" onChange={(e) => { setFullname(e.target.value) }} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label text-white">Nombre de usuario<span className='text-danger'>*</span></label>
                            <input type="text" className="form-control" id="username" onChange={(e) => { setUsername(e.target.value) }} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label text-white">Correo electrónico<span className='text-danger'>*</span></label>
                            <input type="text" className="form-control" id="email" onChange={(e) => { setEmail(e.target.value) }} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label text-white">Contraseña<span className='text-danger'>*</span></label>
                            <input type="password" className="form-control" id="password" onChange={(e) => { setPassword(e.target.value) }} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="phone" className="form-label text-white">Teléfono<span className='text-danger'>*</span></label>
                            <input type="text" className="form-control" id="phone" onChange={(e) => { setPhoneNumber(e.target.value) }} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="bank" className="form-label text-white">Banco<span className='text-danger'>*</span></label>
                            <select class="form-select" id='bank' onChange={(e) => { setBank(e.target.value) }}>
                                <option selected>Seleccione</option>
                                <option value="bancoEstado">Banco Estado</option>
                                <option value="itau">Itaú</option>
                                <option value="falabella">Falabella</option>
                                <option value="santander">Santander</option>
                                <option value="bancoDeChile">Banco de Chile</option>
                                <option value="scotiabank">Scotiabank</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="account" className="form-label text-white">Tipo de cuenta<span className='text-danger'>*</span></label>
                            <select class="form-select" id='account' onChange={(e) => { setAccount(e.target.value) }}>
                                <option selected>Seleccione</option>
                                <option value="vistaAccount">Cuenta vista</option>
                                <option value="currentAccount">Corriente</option>
                                <option value="savingsAccount">Ahorro</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="accountNumber" className="form-label text-white">Número de cuenta<span className='text-danger'>*</span></label>
                            <input type="password" className="form-control" id="accountNumber" onChange={(e) => { setAccountNumber(e.target.value) }}/>
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
                        <button type="submit" className="btn btn-primary py-2">Registrarme</button>
                        <div id="emailHelp" className="form-text text-white">Al hacer click en "Registrarme", aceptas nuestras <span className='text-primary'>condiciones</span> y <span className='text-primary'>políticas de privacidad</span>.</div>
                    </form>
                </div>

            </div>

        </div>
    )
}

export default Register