import React, { useContext, useEffect } from 'react';
import Navbar from '../components/Navbar'
import Icon from '../components/Icon'
import { Context } from "../store/AppContext";
import { useParams } from 'react-router-dom';

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

    return (
        <>
            <Navbar />
            {store.loanAdvertisement ?
                <>
                    <div className='d-flex flex-column justify-content-center align-items-center postWrapper mt-2'>
                        <div className='userDiv text-white text-center display-1 col-3'>
                            {/* <Icon type={'solid'} symbol={'user'} /> */}
                            <img src={store.loanAdvertisement.lender.user.profilePictureLink} alt="profile-picture" style={{height:"100px", width: "100px"}}></img>
                        </div>
                        <div className='text-center mt-2 pb-3 border-bottom border-secondary col-10'>
                            <p className='text-white fw-bold m-0'>{store.loanAdvertisement.lender.user.firstName} {store.loanAdvertisement.lender.user.lastName}</p>
                            <p className='text-secondary m-0'>{store.loanAdvertisement.lender.user.username}</p>
                            <div className='text-center'>
                                <span className='post_details_spn text-primary rounded'>6 transacciones</span> <span className='post_details_spn text-primary rounded'>Negociable: {store.loanAdvertisement.negotiable.toString()}</span>
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
                            <p>{store.loanAdvertisement.description}</p>
                            <p className=''>Condiciones:</p>
                            <ul>
                                <li>Un requerimiento</li>
                                <li>Otro requerimiento</li>
                                <li>Y requerimiento más</li>
                            </ul>
                        </div>


                        <footer className='text-center post_footer pb-3'>
                            <button type="button" className="btn btn-primary w-75 py-2">Solicitar crédito</button>
                        </footer>
                    </div>
                </>
                : <p className='text-white'>No Loan Advertisement Found</p>
            }
        </>
    )
}

export default Post