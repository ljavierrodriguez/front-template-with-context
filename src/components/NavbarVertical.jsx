import React from 'react';
import { useNavigate} from "react-router-dom";
function NavbarVertical() {


    const navigate = useNavigate();
    return (
        <nav className='navbarvertical nav flex-column bg-dark'>
            <a className='nav-link active” aria-current=“page' onClick={() => {navigate("/profile")}}>Mi Perfil</a>
            <a className='nav-link' onClick={() => {navigate("/wall")}}>Publicaciones</a>
            <a className='nav-link' onClick={() => {navigate("/loan-form")}}>Publicar</a>
            <a className='nav-link' href='#'>Ofertas</a>
        </nav>
    )
}
export default NavbarVertical;