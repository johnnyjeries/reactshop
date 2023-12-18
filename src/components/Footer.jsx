import React from 'react'
import '../index.css';


const footerStyle = {
    position: 'fixed',
    bottom: 0,
    width: '100%',
    textAlign: 'center',
    padding: '1rem',
  };

const Footer = () => {
  return (
    <div className='footer bg-dark text-light text-center py-3' style={footerStyle}>Developed By Johnny Jeries</div>
  )
}

export default Footer