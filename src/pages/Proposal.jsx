import React, { useContext, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { useForm } from "react-hook-form";
import { Context } from "../store/AppContext";
import { useParams, useNavigate } from 'react-router-dom';

const Proposal = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const { postId } = useParams();
    const { register, handleSubmit: reactHookFormSubmit, formState: { errors } } = useForm();

    const handlePostPropsal = async (form) => {

        // Create the final payload
        const payload = {
            loanAdvertisementID: postId,
            createdAt: "2023-09-09",
            updatedAt: "2023-09-09",
            interest: form.interest,
            comment: form.comment,
            dueDate: "2023-12-1",
            paymentFrequencyID: "1",
            offerStatusID: "1"
        };

        const proposalResult = await actions.postLoanOffer(payload);

        if (proposalResult) {
            navigate('/post/' + postId);
        }
    }

    return (
        <>
            <Navbar title={'Propuesta'} />

            <div className="container">
                <form className='rounded pb-2' onSubmit={reactHookFormSubmit(handlePostPropsal)}>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label htmlFor="interest" className="form-label text-white">Taza de interés<span className='text-danger'>*</span></label>
                                <input type="text" {...register("interest", { required: 'Debe ingresar una taza de interés' })} className="form-control" id="interest" placeholder="Ingresa un valor numérico" />
                                <p className='text-danger'>{errors.interest?.message}</p>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label htmlFor="numberOfPayments" className="form-label text-white">Cantidad de cuotas<span className='text-danger'>*</span></label>
                                <input type="text" {...register("numberOfPayments", { required: 'Debe ingresar cantidad de cuotas' })} className="form-control" id="numberOfPayments" placeholder="Ingresa un valor numérico" />
                                <p className='text-danger'>{errors.numberOfPayments?.message}</p>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label htmlFor="paymentType" className="form-label text-white">Tipo de pago<span className='text-danger'>*</span></label>
                                <select className="form-select" {...register("paymentType", { required: 'Seleccione un tipo de pago' })} id='paymentType'>
                                    <option value="" disabled>Seleccione</option>
                                    {store.paymentFrequencyTypeOptions.map((option) => (
                                        <option key={option.paymentFrequencyID} value={option.paymentFrequencyID}>
                                            {option.frequency}
                                        </option>
                                    ))}
                                </select>
                                <p className='text-danger'>{errors.paymentType?.message}</p>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label htmlFor="comments" className="form-label text-white">Comentarios:</label>
                                <textarea className="form-control" id="comments" rows="3"></textarea>
                            </div>
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary">Enviar</button>
                </form>
            </div>
        </>
    )
}

export default Proposal