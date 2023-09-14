import React, { useEffect, useContext, useState } from 'react';
import Icon from '../components/Icon';
import PublicationsCard from '../components/PublicationsCard';
import Navbar from '../components/Navbar';
import NavbarVertical from '../components/NavbarVertical';
import SearchBar from '../components/SearchBar';
import TopBar from '../components/TopBar';
import { Context } from '../store/AppContext';

const Wall = () => {

    const { store, actions } = useContext(Context);
    //get the loan advertisements
    useEffect(() => {

        const handleGetLoanAdvertisements = async () => {
            await actions.getLoanAdvertisements();
           
        }
        handleGetLoanAdvertisements()
       
    }, []);


    return (
        <div className='container-fluid'>
            <div className='d-md-none'>
                <Navbar />
            </div>

            <div className='row d-md-none'>
                <div className='col-10'>
                    <h5 className='text-secondary mx-3 mb-0'>Bienvenido!</h5>
                    <p className='text-white mx-3 mt-0 mb-0'>LUIS</p>
                </div>
                <div className='col-2'>
                    <span className='text-white'> <Icon type={'regular'} symbol={'bell'} /></span>
                </div>
            </div>

            <div className='mt-1 mb-1 d-md-none'>
                <div className='d-flex justify-content-between'>
                    <span className='text-white mx-3' >Publicaciones</span>
                    <span className='text-white-50'>See All</span>
                </div>
            </div>
            <TopBar />
            <div className="row">
                <div className='d-none d-md-inline col-md-3 col-lg-3'>
                    <NavbarVertical />
                </div>
                <div className='col-10 offset-1 col-md-8 offset-md-0 offset-lg-1 col-lg-7 d-flex flex-column align-items-center'>
                    <SearchBar />
                    {
                        store.loanAdvertisements ?
                            store.loanAdvertisements.map((loanAdv, i) => (
                                <PublicationsCard lendersName={loanAdv.lender.user.firstName} username={loanAdv.lender.user.username} loanAmount={loanAdv.amount} negotiable={loanAdv.negotiable} key={i}/>
                            )) : <p className='text-white'>Sin publicaciones</p>

                            }
                </div>
            </div>
            <div className='midiv row col-12 d-md-none fixed-bottom'>
                <div className='text-primary text-opacity-75 fs-6 text-center col-6'>
                    <i><Icon type={'solid'} symbol={'house'} />
                        <p>Home</p></i> </div>
                <div className='text-primary text-opacity-75 fs-6 text-center col-6'>
                    <i><Icon type={'solid'} symbol={'user'} />
                        <p>Profile</p></i>
                </div>
            </div>
        </div>
    )
}
export default Wall