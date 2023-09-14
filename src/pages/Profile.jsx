import React, { useState, useContext, useEffect } from 'react';
import { Context } from "../store/AppContext";
import Navbar from '../components/Navbar';
import Icon from '../components/Icon';
import { useNavigate } from "react-router-dom";
import { get } from 'react-hook-form';

const Profile = () => {
    const { store, actions } = useContext(Context);
    const [profilePictureFile, setProfilePictureFile] = useState(null);
    const [profilePictureFileError, setProfilePictureFileError] = useState('');

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

    return (
        <>
            <Navbar title={'Perfil de usuario'} />
            <div className='mt-3'>
                {store.user.user ? <>
                    <div className='p-1 btn_post_choices_wrapper rounded'>
                        <button className='btn_post_choices text-white bg-primary rounded p-2 w-50'>Prestatario</button>
                        <button className='btn_post_choices text-secondary rounded p-2 w-50'>Prestamista</button>
                    </div>

                    <div className='d-flex justify-content-center text-white mt-3 mb-2'>
                        <span className='text-white display-1'>
                            {/* <Icon type={'solid'} symbol={'user'} /> */}
                            <img src={store.user.user.profilePictureLink} alt="profile-picture" style={{height:"100px", width: "100px"}}></img>
                            {profilePictureFile ? <button type="submit" className="btn btn-secondary mb-2 w-100" onClick={handleUploadProfilePicture}>Update profile picture</button> : ""}
                        </span>
                        <span className='text-white align-self-baseline fs-5'>
                            <label className="custom-file-upload">
                                <input type="file" accept="image/png, image/jpeg" onChange={(e) => setProfilePictureFile(e.target.files[0])} style={{ display: 'none' }} />
                                <Icon type={'solid'} symbol={'pen-to-square'} />
                            </label>
                        </span>
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
                                <p className='text-white fs-5'>
                                    <Icon type={'solid'} symbol={'pen-to-square'} />
                                </p>
                            </div>
                            <p className='text-secondary m-0'>{store.user.user.phoneNumber}</p>
                        </div>
                        <div>
                            <div className='d-flex justify-content-between align-items-center'>
                                <p className='text-white m-0'>Datos bancarios</p>
                                <p className='text-white fs-5'>
                                    <Icon type={'solid'} symbol={'pen-to-square'} />
                                </p>
                            </div>
                            <span className='text-secondary'>{store.user.user.bankDetails.bank.bankName}</span>
                            <br />
                            <span className='text-secondary'>{store.user.user.bankDetails.accountType.accountName}</span>
                            <br />
                            <span className='text-secondary'>{store.user.user.bankDetails.bankAccountNumber}</span>
                        </div>

                        <div className='mt-4'>
                            <button className='w-50 text-primary p-0 m-0 fs-4 border border-0 rounded btn_post_choices_wrapper'><Icon type={'solid'} symbol={'file-invoice'} /><br /><span className='fs-6 p-0 m-0'>Propuestas</span></button>
                            <button className='w-50 text-primary p-0 m-0 fs-4 border border-0 rounded btn_post_choices_wrapper'><Icon type={'solid'} symbol={'user'} /><br /><span className='fs-6 p-0 m-0'>Perfil</span></button>
                        </div>
                    </div>
                </> : <p className='text-white'>No user information found</p>}
            </div>
        </>
    )
}

export default Profile