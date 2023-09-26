import React from 'react';
import Icon from '../components/Icon';
import "../css/card.css";

function PostsCard({ loanOfferID, debtorsName, debtorID, userDebtorID, username, loanAmount, profilePicture, deletePostCallback, editPostCallback }) {

    return (
        <>
            <div className='container bg-dark pb-2 mb-4 rounded innerCard'>
                <div className='row d-flex justify-content-between p-2'>
                    <div className='text-white col-3 display-1 align-self-center text-center'>
                        {profilePicture ? <img src={profilePicture} alt="profile-picture" height={'60px'} className='rounded'></img> : <Icon type={'solid'} symbol={'user'} />}
                    </div>
                    <div className='col-9'>
                        <div className='d-flex justify-content-between'>
                            <span className='text-primary text-opacity-50 fs-6'>{username}</span>
                            <span className='text-primary fw-bold '>{loanAmount}</span>
                        </div>
                        <h5 className='text-white'>{debtorsName}</h5>
                        <p className='textcardlocation text-secondary pt-2'> <Icon type={'solid'} symbol={'location-dot'} /> Santiago,Chile </p>

                    </div>
                </div>
                <div className='d-flex justify-content-around'>
                    <div className=''>
                        <span className='textcard text-primary text-opacity-75 bg-black m-1 rounded px-1'>1 Transacción</span>
                    </div>
                    <div className=''>
                        {debtorID != userDebtorID ? "" :
                            <>
                                <span className='text-white' style={{cursor:"pointer"}}>  <Icon type={'regular'} symbol={'pen-to-square'} /></span>
                                <span className='text-white' style={{cursor:"pointer"}} onClick={() => deletePostCallback(debtorID, loanOfferID)}>  <Icon type={'solid'} symbol={'trash'} /></span>
                            </>}
                    </div>
                </div>
                <div>
                </div>
            </div>
        </>
    )
}
export default PostsCard;