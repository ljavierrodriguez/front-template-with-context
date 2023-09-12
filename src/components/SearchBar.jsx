import React from 'react'

const SearchBar = () => {
  return (
    <>
        <div className='container mb-3 p-0' >
                <form className=''>
                    <input className='form-control' type='search' placeholder='Busqueda por monto o palabra' aria-label='Search' />
                </form>
            </div>
    </>
  )
}

export default SearchBar