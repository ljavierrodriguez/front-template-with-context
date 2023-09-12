import React from 'react'
function NavbarVertical() {
    return (
        <nav className='navbarvertical nav flex-column bg-dark'>
            <a className='nav-link active” aria-current=“page' href='#'>Mi Perfil</a>
            <a className='nav-link bg-primary text-white' href='#'>Publicaciones</a>
            <a className='nav-link' href='#'>Publicar</a>
            <a className='nav-link' href='#'>Ofertas</a>
        </nav>
    )
}
export default NavbarVertical;