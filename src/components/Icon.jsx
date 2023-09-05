import React from 'react'

const Icon = ({type, symbol}) => {
  return (
    <i className={`fa-${type} fa-${symbol}`}></i>
  )
}

Icon.defaultProps = {
    type: 'solid',
    symbol: 'arrow-left'
}

export default Icon