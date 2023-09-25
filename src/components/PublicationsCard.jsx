import React from 'react';
import Icon from '../components/Icon';
import { Link, useNavigate } from 'react-router-dom';
import "../css/card.css";

function PublicationsCard({ lendersName, username, loanAmount, negotiable, profilePicture, postId }) {
    const navigate = useNavigate();

    return (
        <>
            <div className='container bg-dark pb-2 mb-4 rounded innerCard' onClick={() => navigate("/post/" + postId)}>
                <div className='row d-flex justify-content-between p-2'>
                    <div className='text-white col-3 display-1 align-self-center text-center'>
                        {profilePicture ? <img src={profilePicture} alt="profile-picture" height={'60px'} className='rounded'></img> : <Icon type={'solid'} symbol={'user'} />}
                    </div>
                    <div className='col-9'>
                        <div className='d-flex justify-content-between'>
                            <span className='text-primary text-opacity-50 fs-6'>{username}</span>
                            <span className='text-primary fw-bold '>${loanAmount}</span>
                        </div>
                        <h5 className='text-white'>{lendersName}</h5>
                        <p className='textcardlocation text-secondary pt-2'> <Icon type={'solid'} symbol={'location-dot'} /> Santiago,Chile </p>

                    </div>
                </div>
                <div className='d-flex justify-content-end'>
                    <div className=''>
                        <span className='textcard text-primary text-opacity-50 bg-black m-1 rounded px-1'>{negotiable}</span>
                        <span className='textcard text-primary text-opacity-75 bg-black m-1 rounded px-1'>1 Transacción</span>
                    </div>
                    {/* <div className=''>
                        <Link to={"/post/" + postId}>
                            <span className='text-white'> <Icon type={'regular'} symbol={'pen-to-square'} /></span>
                        </Link>

                        <span className='text-white'> <Icon type={'solid'} symbol={'trash'} /></span>
                    </div> */}
                </div>
                <div>
                </div>
            </div>
        </>
    )
}
export default PublicationsCard;