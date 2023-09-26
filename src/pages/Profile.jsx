import React, { useState, useContext, useEffect } from 'react';
import { Context } from "../store/AppContext";
import Navbar from '../components/Navbar';
import Icon from '../components/Icon';
import { get } from 'react-hook-form';
import NavbarVertical from '../components/NavbarVertical';
import TopBar from '../components/TopBar';
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const navigate = useNavigate();
    const { store, actions } = useContext(Context);
    const [profilePictureFile, setProfilePictureFile] = useState(null);
    const [profilePictureFileError, setProfilePictureFileError] = useState('');
    const [phoneNumber, setPhoneNumber] = useState(null);
    const [bank, setBank] = useState(null);

    const toggleAndSaveUserMode = (mode) => { actions.setUserMode(mode) }

    //get the user
    useEffect(() => {
        const getUser = async () => {
            await actions.getUser()
        }

        getUser();

    }, []);

    const handleUploadProfilePicture = async () => {

        // Check if there are file validation errors
        if (!profilePictureFile) {
            setProfilePictureFileError('Profile picture is required');
            return;
        }

        const profileFileAsFile = new File([profilePictureFile], profilePictureFile.name, { type: profilePictureFile.type });

        const formData = new FormData();
        formData.append('profilePicture', profileFileAsFile);

        const updateProfilePicture = await actions.updateProfilePicture(formData);

        if (updateProfilePicture) {
            setProfilePictureFile(null);
        }
    }

    const openFormControl = (formControl, valueToSet) => {
        if (formControl === "phone") {
            setPhoneNumber(valueToSet);
        }

        else if (formControl === "bank") {
            setBank(valueToSet);
        }
    }

    const submitFormControl = async (formControl, valueToSet) => {
        if (formControl === "phone") {

            // Create the final payload
            const payload = {
                phoneNumber: valueToSet,
            };

            const updateProfilePhone = await actions.updateProfilePhone(payload);

            if (updateProfilePhone) {
                setPhoneNumber(null);
            }
        }

        else if (formControl === "bank"){
            // Create the final payload
            const payload = {
                bankAccountNumber: valueToSet.accountNumber,
                bankNameID: valueToSet.bank,
                accountTypeID: valueToSet.account,
            };

            console.log(payload);
            const updateProfileBank = await actions.updateProfileBank(payload);

            if (updateProfileBank) {
                setBank(null);
            }
        }
    }

    return (
        <>
            <div className='container-fluid'>
                <TopBar />
            </div>
            <div className='d-md-none'>
                <Navbar title={'Perfil de usuario'} />
            </div>

            <div className='row'>
                <div className='d-none d-md-inline col-3'>
                    <NavbarVertical />
                </div>

                <div className='mt-3 col-md-7 offset-md-1'>
                    {store.user.user ? <>
                        <ul className="nav nav-tabs justify-content-center w-100" id="myTab">
                            <li className="nav-item w-50 ps-5 text-center">
                                <a href="#" className="nav-link active" data-bs-toggle="tab" onClick={() => toggleAndSaveUserMode('debtor')}>Prestatario</a>
                            </li>
                            <li className="nav-item w-50 pe-5 text-center">
                                <a href="#" className="nav-link" data-bs-toggle="tab" onClick={() => toggleAndSaveUserMode('lender')}>Prestamista</a>
                            </li>
                        </ul>

                        <div className='justify-content-center text-white mt-3 mb-2'>
                            <div className="row">
                                <div className="col-6">
                                    <img src={store.user.user.profilePictureLink} alt="profile-picture" height={'120px'} className='rounded float-end'></img>
                                </div>
                                <div className="col-6">
                                    <div className="row h-50">
                                        {profilePictureFile ? <button type="submit" className="btn btn-secondary mb-2 btn-sm w-50" onClick={handleUploadProfilePicture}>Update profile picture</button> : ""}
                                    </div>
                                    <div className="row h-50 align-items-end">
                                        <div className="col">
                                            <span className='text-white align-self-baseline fs-5'>
                                                <label className="custom-file-upload" style={{ cursor: "pointer" }}>
                                                    <input type="file" accept="image/png, image/jpeg" onChange={(e) => setProfilePictureFile(e.target.files[0])} style={{ display: 'none' }} />
                                                    <Icon type={'solid'} symbol={'pen-to-square'} />
                                                </label>
                                            </span>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className='mx-4 mt-3'>
                            <div>
                                <p className='text-white m-0'>Nombre completo</p>
                                <span className='text-secondary'>{store.user.user.firstName} {store.user.user.lastName}</span>
                            </div>
                            <div>
                                <p className='text-white m-0'>Nombre de usuario</p>
                                <span className='text-secondary'>{store.user.user.username}</span>
                            </div>
                            <div>
                                <p className='text-white m-0'>Cédula de identificación</p>
                                <span className='text-secondary'>{store.user.user.identity.identityNumber}</span>
                            </div>
                            <div>
                                <p className='text-white m-0'>Correo electrónico</p>
                                <span className='text-secondary'>{store.user.user.email}</span>
                            </div>
                            <div>
                                <div className='d-flex justify-content-between align-items-center'>
                                    <p className='text-white m-0'>Teléfono</p>
                                    <p className='text-white fs-5' onClick={() => openFormControl("phone", store.user.user.phoneNumber)} style={{ cursor: "pointer" }}>
                                        <Icon type={'solid'} symbol={'pen-to-square'} />
                                    </p>
                                </div>
                                {phoneNumber ?
                                    <>
                                        <div className="row">
                                            <div className="col-6">
                                                <input type="text" defaultValue={store.user.user.phoneNumber} className="form-control" id="phone" onChange={(e) => { setPhoneNumber(e.target.value) }} />
                                            </div>
                                            <div className="col-6">
                                                <button type="submit" className="btn btn-secondary btn-sm w-50 h-100" style={{fontSize: "1.5vh"}} onClick={() => submitFormControl("phone", phoneNumber)}>Update Teléfono</button>
                                            </div>
                                        </div>
                                    </>
                                    : <p className='text-secondary m-0'>{store.user.user.phoneNumber}</p>}
                            </div>
                            <div>
                                <div className='d-flex justify-content-between align-items-center'>
                                    <p className='text-white m-0'>Datos bancarios</p>
                                    <p className='text-white fs-5' onClick={() => openFormControl("bank", { bank: store.user.user.bankDetails.bank.bankID, account: store.user.user.bankDetails.accountType.accountTypeID, accountNumber: store.user.user.bankDetails.bankAccountNumber })} style={{ cursor: "pointer" }}>
                                        <Icon type={'solid'} symbol={'pen-to-square'} />
                                    </p>
                                </div>
                                {bank ?
                                    <>
                                        <div className="row">
                                            <div className="col-12">
                                                <div className="row">
                                                    <div className="col-6">
                                                        <div className="mb-3">
                                                            <label htmlFor="bank" className="form-label text-white">Banco<span className='text-danger'>*</span></label>
                                                            <select className="form-select" id='bank' defaultValue={bank.bank} onChange={(e) => {
                                                                let tempBank = bank;
                                                                tempBank.bank = e.target.value;
                                                                setBank(tempBank)
                                                            }}>
                                                                {store.bancoOptions.map((option) => (
                                                                    <option key={option.bankID} value={option.bankID}>
                                                                        {option.bankName}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-6">
                                                        <div className="mb-3">
                                                            <label htmlFor="account" className="form-label text-white">Tipo de cuenta<span className='text-danger'>*</span></label>
                                                            <select className="form-select" id='account' defaultValue={bank.account} onChange={(e) => {
                                                                let tempBank = bank;
                                                                tempBank.account = e.target.value;
                                                                setBank(tempBank);
                                                            }}>
                                                                {store.accountTypeOptions.map((option) => (
                                                                    <option key={option.accountTypeID} value={option.accountTypeID}>
                                                                        {option.accountName}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="col-6 d-flex align-items-center">
                                                        <button type="submit" className="btn btn-secondary btn-sm w-50 h-50" style={{fontSize: "1.5vh"}} onClick={() => submitFormControl("bank", bank)}>Update Banco</button>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-6">
                                                        <div className="mb-3">
                                                            <label htmlFor="accountNumber" className="form-label text-white">Número de cuenta<span className='text-danger'>*</span></label>
                                                            <input type="text" defaultValue={bank.accountNumber} className="form-control" id="accountNumber" onChange={(e) => {
                                                                let tempBank = bank;
                                                                tempBank.accountNumber = e.target.value;
                                                                setBank(tempBank)
                                                            }} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                    :
                                    <>
                                        <span className='text-secondary'>{store.user.user.bankDetails.bank.bankName}</span>
                                        <br />
                                        <span className='text-secondary'>{store.user.user.bankDetails.accountType.accountName}</span>
                                        <br />
                                        <span className='text-secondary'>{store.user.user.bankDetails.bankAccountNumber}</span>
                                    </>
                                }
                            </div>

                            <div className='mt-4 d-md-none'>
                                <button className='w-50 text-primary p-0 m-0 fs-4 border border-0 rounded btn_post_choices_wrapper' ><Icon type={'solid'} symbol={'file-invoice'} /><br /><span className='fs-6 p-0 m-0'>Propuestas</span></button>
                                <button className='w-50 text-primary p-0 m-0 fs-4 border border-0 rounded btn_post_choices_wrapper' onClick={() => { navigate("/profile") }}><Icon type={'solid'} symbol={'user'} /><br /><span className='fs-6 p-0 m-0'>Perfil</span></button>
                            </div>
                        </div>
                    </> : <p className='text-white'>No user information found</p>}
                </div>
            </div>

        </>
    )
}

export default Profile