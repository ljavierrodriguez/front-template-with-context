import React, { useContext, useEffect } from 'react';
import NavbarMobile from '../components/NavbarMobile'
import { Context } from "../store/AppContext";
import { Link, useParams } from 'react-router-dom';
import PostsCard from '../components/PostsCard';
import "../css/imageHoverCross.css"

const Post = () => {
    const { store, actions } = useContext(Context);
    const { postId } = useParams();

    //get the post
    useEffect(() => {
        const getPost = async () => {
            await actions.getLoanAdvertisement(postId)
        }

        getPost();

    }, []);

    const deleteLoanOffer = async (debtorID, loanOfferID) => {
        const result = await actions.deleteLoanOffer(debtorID, loanOfferID);
        if (result) {
            await actions.getLoanAdvertisement(postId);
        }
    }

    return (
        <>
            <NavbarMobile />
            {store.loanAdvertisement ?
                <>
                    <div className='d-flex flex-column justify-content-center align-items-center postWrapper mt-2'>
                        <div className='userDiv text-white text-center display-1 col-3'>
                            {/* <Icon type={'solid'} symbol={'user'} /> */}
                            <div className="img-hover-cross">
                                <img src={store.loanAdvertisement.lender.user.profilePictureLink} alt="profile-picture" style={{ height: "100px", width: "100px" }}></img>
                            </div>
                        </div>
                        <div className='text-center mt-2 pb-3 border-bottom border-secondary col-10'>
                            <p className='text-white fw-bold m-0'>{store.loanAdvertisement.lender.user.firstName} {store.loanAdvertisement.lender.user.lastName}</p>
                            <p className='text-secondary'>{store.loanAdvertisement.lender.user.username}</p>
                            <div className='text-center'>
                                <span className='post_details_spn text-primary rounded'>6 transacciones</span> <span className='post_details_spn text-primary rounded'>Negociable: {store.loanAdvertisement.negotiable.toString()}</span>
                            </div>
                        </div>
                        <div className='mt-3'>
                            <div className='p-1 btn_post_choices_wrapper rounded'>
                                <ul className="nav nav-tabs border-bottom-0 justify-content-center" id="myTab">
                                    <li className="nav-item">
                                        <a href="#conditions" className="nav-link active" data-bs-toggle="tab">Descripción</a>
                                    </li>
                                    <li className="nav-item">
                                        <a href="#proposals" className="nav-link" data-bs-toggle="tab">Propuesta</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="tab-content">
                        <div className="tab-pane fade show active" id="conditions">
                            <div className='conditions_wrapper'>
                                <div className='text-white post_requirements post_conditions'>
                                    <p>{store.loanAdvertisement.description}</p>
                                    <p className=''>Condiciones:</p>
                                    <ul>
                                        <li>Monto del préstamo: {store.loanAdvertisement.amount}</li>
                                        <li>Pago {store.loanAdvertisement.paymentFrequency.frequency == 'Weekly' ? 'semanal' : 'mensual'}</li>
                                        <li>Intereses a pagar: {store.loanAdvertisement.interest} %</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="tab-pane fade" id="proposals">
                            <div className="row">
                                <div className="col-12 p-5">
                                    {
                                        store.loanAdvertisement.loanOffers.length > 0 && store.user.user ?
                                            store.loanAdvertisement.loanOffers.map((loanOff, i) => (
                                                <PostsCard loanOfferID={loanOff.loanOfferID} debtorsName={loanOff.debtor.user.firstName} debtorID={loanOff.debtor.debtorID} userDebtorID={store.user.user.debtor.debtorID} username={loanOff.debtor.user.username} loanAmount={loanOff.amount} profilePicture={loanOff.debtor.user.profilePictureLink} deletePostCallback={deleteLoanOffer} key={i} />
                                            )) : <p className='text-white'>Sin posts</p>

                                    }
                                </div>
                            </div>
                        </div>
                    </div>

                    {store.user.user && store.loanAdvertisement.lender.user.userID === store.user.user.userID ? "" : 
                    <footer className='text-center post_footer pt-3 pb-3'>
                        <Link to={"/post/" + postId + "/proposal"} >
                            <button type="button" className="btn btn-primary w-50 py-2">Solicitar crédito</button>
                        </Link>
                    </footer>}

                </>
                : <p className='text-white'>No Loan Advertisement Found</p>
            }
        </>
    )
}

export default Post