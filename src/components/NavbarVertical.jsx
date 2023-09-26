import React, {useContext} from 'react';
import { useNavigate} from "react-router-dom";
import { Context } from "../store/AppContext";

function NavbarVertical() {
    const navigate = useNavigate();
    const { store, actions } = useContext(Context);
    return (
        <nav className='navbarvertical nav flex-column bg-dark'>
            <a className='nav-link active” aria-current=“page' style={{cursor: "pointer"}} onClick={() => {navigate("/profile")}}>Mi Perfil</a>
            <a className='nav-link' style={{cursor: "pointer"}} onClick={() => {navigate("/wall")}}>Publicaciones</a>
            {store.toggleUserMode == 'lender' ? <a className='nav-link' style={{cursor: "pointer"}} onClick={() => {navigate("/loan-form")}}>Publicar</a> : ''}
            {store.toggleUserMode == 'lender' ? <a className='nav-link' style={{cursor: "pointer"}} href='#'>Ofertas</a> : '' }
        </nav>
    )
}
export default NavbarVertical;