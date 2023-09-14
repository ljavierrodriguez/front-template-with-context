import React, { useState, useContext, useEffect } from 'react';
import { Context } from "../store/AppContext";
import Navbar from '../components/Navbar';
import DropzoneFileUploader from '../components/DropzoneFileUploader';
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const { register, handleSubmit: reactHookFormSubmit, formState: { errors } } = useForm();
    const [firstName, setFirstName] = useState('');
    const [lastName, setlastName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [bank, setBank] = useState('');
    const [account, setAccount] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [identityFile, setIdentityFile] = useState('');
    const [dicomFile, setDicomFile] = useState('');
    const [identityFileError, setIdentityFileError] = useState('');
    const [dicomFileError, setDicomFileError] = useState('');

    const handleFileDrop = (acceptedFiles, fileReference) => {
        // Reset errors if a file is dropped
        setIdentityFileError('');
        setDicomFileError('');

        if (acceptedFiles.length < 1) {
            // Handle no files error
            if (fileReference === "Cédula de identidad") {
                setIdentityFileError('Cédula de identidad is required');
            } else if (fileReference === "Informe Dicom") {
                setDicomFileError('Informe Dicom is required');
            }
            return;
        }

        if (fileReference === "Cédula de identidad") {
            setIdentityFile(acceptedFiles[0])
        } else if (fileReference === "Informe Dicom") {
            setDicomFile(acceptedFiles[0])
        }
    };

    const handleFormSubmit = async (data) => {

        // Check if there are file validation errors
        if (!identityFile || !dicomFile) {
            if (!identityFile){
                setIdentityFileError('Cédula de identidad is required');
            }

            if (!dicomFile){
                setDicomFileError('Informe Dicom is required');
            }

            return;
        }
        

        // Create the identity and dicom objects
        const identity = {
            identityNumber: "4242424",
            identityFileName: identityFile.name,
            identityFile: "",
            identityType: "RUT",
        };

        const dicom = {
            dicomFileName: dicomFile.name,
            dicomFile: "",
        };

        // Create the bankDetails object
        const bankDetails = {
            bankAccountNumber: accountNumber,
            bankNameID: bank,
            accountTypeID: account,
        };

        // Create the final payload
        const payload = {
            username: username,
            password: password,
            firstName: firstName,
            lastName: lastName,
            email: email,
            phoneNumber: phoneNumber,
            identity: identity,
            dicom: dicom,
            bankDetails: bankDetails,
        };

        const identityFileAsFile = new File([identityFile], identityFile.name, { type: identityFile.type });
        const dicomFileAsFile = new File([dicomFile], dicomFile.name, { type: dicomFile.type });

        const formData = new FormData();
        formData.append('loginRequest', JSON.stringify(payload));
        formData.append('identityFile', identityFileAsFile);
        formData.append('dicomFile', dicomFileAsFile);

        const registrationResult = await actions.registerUser(formData);

        if (registrationResult) {
            actions.setNotificationPage("Registration Successful", "Back to Login", "/");
            navigate('/notification');
        }
    }

    return (
        <div className=''>
            <Navbar title={"Registro"} type={'solid'} symbol={'arrow-left'} />

            <div className='row'>
                <div className='d-none d-md-inline col-md-6'>

                </div>
                <div className='col-12 col-md-5 d-flex justify-content-center'>
                    <form className='p-3 rounded col-10 col-md-12 mt-3' onSubmit={reactHookFormSubmit(handleFormSubmit)}>
                        <div className="mb-3">
                            <label htmlFor="firstName" className="form-label text-white">Primer Nombre<span className='text-danger'>*</span></label>
                            <input type="text" {...register("firstName", { required: 'Su nombre es requerido' })} className="form-control" id="firstName" onChange={(e) => { setFirstName(e.target.value) }} />
                            <p className='text-danger'>{errors.firstName?.message}</p>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="lastName" className="form-label text-white">Apellidos<span className='text-danger'>*</span></label>
                            <input type="text" {...register("lastName", { required: 'Su nombre es requerido' })} className="form-control" id="lastName" onChange={(e) => { setlastName(e.target.value) }} />
                            <p className='text-danger'>{errors.lastName?.message}</p>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label text-white">Nombre de usuario<span className='text-danger'>*</span></label>
                            <input type="text" {...register("username", { required: 'Debe ingresar un nombre de usuario' })} className="form-control" id="username" onChange={(e) => { setUsername(e.target.value) }} />
                            <p className='text-danger'>{errors.username?.message}</p>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label text-white">Correo electrónico<span className='text-danger'>*</span></label>
                            <input type="text" {...register("email", { required: 'Debe ingresar su correo electrónico' })} className="form-control" id="email" onChange={(e) => { setEmail(e.target.value) }} />
                            <p className='text-danger'>{errors.email?.message}</p>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label text-white">Contraseña<span className='text-danger'>*</span></label>
                            <input type="password" {...register("password", { required: 'Debe ingresar una contraseña', minLength: { value: 6, message: 'La contraseña debe contener al menos 6 caracteres' } })} className="form-control" id="email" onChange={(e) => { setPassword(e.target.value) }} />
                            <p className='text-danger'>{errors.password?.message}</p>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="phone" className="form-label text-white">Teléfono<span className='text-danger'>*</span></label>
                            <input type="text" {...register("phone", { required: 'Ingrese su número telefónico' })} className="form-control" id="phone" onChange={(e) => { setPhoneNumber(e.target.value) }} />
                            <p className='text-danger'>{errors.phone?.message}</p>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="bank" className="form-label text-white">Banco<span className='text-danger'>*</span></label>
                            <select className="form-select" {...register("bank", { required: 'Seleccione un banco' })} id='bank' value={bank} onChange={(e) => { setBank(e.target.value) }}>
                                <option value="" disabled>Seleccione un banco</option>
                                {store.bancoOptions.map((option) => (
                                    <option key={option.bankID} value={option.bankID}>
                                        {option.bankName}
                                    </option>
                                ))}
                            </select>
                            <p className='text-danger'>{errors.bank?.message}</p>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="account" className="form-label text-white">Tipo de cuenta<span className='text-danger'>*</span></label>
                            <select className="form-select" {...register("account", { required: 'Seleccione un tipo de cuenta' })} id='account' value={account} onChange={(e) => { setAccount(e.target.value) }}>
                                <option value="" disabled>Seleccione un tipo de cuenta</option>
                                {store.accountTypeOptions.map((option) => (
                                    <option key={option.accountTypeID} value={option.accountTypeID}>
                                        {option.accountName}
                                    </option>
                                ))}
                            </select>
                            <p className='text-danger'>{errors.account?.message}</p>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="accountNumber" className="form-label text-white">Número de cuenta<span className='text-danger'>*</span></label>
                            <input type="password" {...register("accountNumber", { required: 'Ingrese su número de cuenta' })} className="form-control" id="accountNumber" onChange={(e) => { setAccountNumber(e.target.value) }} />
                            <p className='text-danger'>{errors.accountNumber?.message}</p>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="idFile" className="form-label text-white">Cédula de identidad<span className='text-danger'>*</span></label>
                            <DropzoneFileUploader onFileDrop={handleFileDrop} fileReference={"Cédula de identidad"} />
                            <p className='text-danger'>{identityFileError}</p>
                        </div>

                        <div className='mb-3'>
                            <label htmlFor="dicomFile" className="form-label text-white">Informe Dicom<span className='text-danger'>*</span></label>
                            <DropzoneFileUploader onFileDrop={handleFileDrop} fileReference={"Informe Dicom"} />
                            <p className='text-danger'>{dicomFileError}</p>
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