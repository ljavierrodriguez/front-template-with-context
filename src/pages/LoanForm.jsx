import React, { useState, useContext } from 'react';
import Navbar from '../components/NavbarMobile';
import TopBar from '../components/TopBar';
import { Context } from "../store/AppContext";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from 'react-router-dom';

const LoanForm = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const { register, handleSubmit: reactHookFormSubmit, formState: { errors } } = useForm();

    const handlePublicationPost = async (form) => {

        const negociableBool = form.negotiationOption === "negotiable" ? "true" : "false";
        
        // Create the final payload
        const payload = {
            amount: form.amount,
            createdAt: "2023-09-09",
            updatedAt: "2023-09-09",
            interest: form.interest,
            dueDate: "2023-12-1",
            paymentFrequencyID: form.paymentFrequencyID,
            negotiable: negociableBool,
            description: form.description,
        };

        const publicationResult = await actions.postLoanAdvertisement(payload);

        if (publicationResult) {
            navigate('/wall');
        }
    }

    return (
        <>
            <div className='d-md-none'>
                <Navbar title={'Nueva publicación'} />
            </div>
            <div className='container-fluid d-none d-md-block'>
                <TopBar />
            </div>

            <div className='d-flex flex-column align-items-center col-md-8 offset-md-2'>
                <h3 className='text-white'>Nueva Publicación</h3>
                <form className='p-4 rounded col-10 mt-3' onSubmit={reactHookFormSubmit(handlePublicationPost)}>
                    <div className="mb-3">
                        <label htmlFor="loanAmount" className="form-label text-white">Monto del crédito<span className='text-danger'>*</span></label>
                        <input type="text" {...register("amount", { required: 'Debes ingresar un monto de crédito' })} className="form-control bg-transparent text-light" id="loanAmount" />
                        <p className='text-danger'>{errors.amount?.message}</p>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="interest" className="form-label text-white">Tasa de interés<span className='text-danger'>*</span></label>
                        <input type="text" {...register("interest", { required: 'Debe ingresar una tasa de interés' })} className="form-control bg-transparent text-light" id="interest" />
                        <p className='text-danger'>{errors.interest?.message}</p>
                    </div>
                    {/* <div className="mb-3">
                        <label htmlFor="payments" className="form-label text-white">Cantidad de cuotas<span className='text-danger'>*</span></label>
                        <input type="password" className="form-control" id="payments"  />
                    </div> */}
                    <div className="mb-3">
                        <label htmlFor="payment_periods" className="form-label text-white">Tipo de pago<span className='text-danger'>*</span></label>
                        <select className="form-select bg-transparent text-light" {...register("paymentFrequencyID", { required: 'Seleccione un tipo de pago' })} id='payment_periods' >
                            <option value="" disabled>Seleccione</option>
                            {store.paymentFrequencyTypeOptions.map((option) => (
                                <option className='text-dark' key={option.paymentFrequencyID} value={option.paymentFrequencyID}>
                                    {option.frequency}
                                </option>
                            ))}
                        </select>
                        <p className='text-danger'>{errors.paymentType?.message}</p>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="comments" className="form-label text-white">Comentarios<span className='text-danger'>*</span></label>
                        <textarea {...register("description")} className="form-control bg-transparent text-light" id="comments" rows="3" ></textarea>
                        <p className='text-danger'>{errors.description?.message}</p>
                    </div>

                    <div className='d-flex justify-content-center'>
                        <div className="mb-3 form-check p-2">
                            <input
                                type="radio"
                                className="form-check-input"
                                id="negotiable"
                                value="negotiable"
                                {...register("negotiationOption", { required: 'Seleccione una opción' })} // Register and require the radio button
                            />
                            <label className="form-check-label  text-white" htmlFor="negotiable">Negociable</label>
                        </div>
                        <div className="mb-3 form-check p-2 ps-5">
                            <input
                                type="radio"
                                className="form-check-input"
                                id="notNegotiable"
                                value="notNegotiable"
                                {...register("negotiationOption", { required: 'Seleccione una opción' })} // Register and require the radio button
                            />
                            <label className="form-check-label  text-white" htmlFor="notNegotiable">No negociable</label>
                        </div>
                        <p className='text-danger'>{errors.paymentType?.negotiationOption}</p>
                    </div>

                    <button type="submit" className="btn btn-primary w-100 mt-2">Publicar</button>
                </form>
            </div>

        </>
    )
}

export default LoanForm