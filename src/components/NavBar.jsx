import React from 'react'
import { Routes, Route, Link } from 'react-router-dom';
import Products from '../pages/Products';
import Purchases from '../pages/Purchases';
import Customers from '../pages/Customers';
import HomePage from '../pages/HomePage';
import EditProduct from '../pages/EditProduct';
import EditCustomer from '../pages/EditCustomer';

const NavBar = () => {
  return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="#">ReactShop</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                <Link to='/' className='nav-link'>Homepage</Link>
                </li>
                <li className="nav-item">
                <Link to='/products' className='nav-link'>Products</Link>
                </li>
                <li className="nav-item">
                <Link to='/customers' className='nav-link'>Customers</Link>
                </li>
                <li className="nav-item">
                <Link to='/purchases' className='nav-link'>Purchases</Link>
                </li>
            </ul>
            </div>
        </nav>
        <Routes>
            <Route path='/' element={<HomePage/>}></Route>
            <Route path='/products' element={<Products/>}></Route>
            <Route path='/customers' element={<Customers/>}></Route>
            <Route path='/purchases' element={<Purchases/>}></Route>
            <Route path='/EditProduct/:productId' element={<EditProduct/>}></Route>
            <Route path='/EditCustomer/:customerId' element={<EditCustomer/>}></Route>
        </Routes>
    </div>
  )
}

export default NavBar