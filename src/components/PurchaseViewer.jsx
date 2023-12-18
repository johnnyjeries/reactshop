import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';

const PurchaseViewer = () => {
    const products = useSelector((state) => state.products.products);
    const customers = useSelector((state) => state.customers.customers);
    const purchases = useSelector((state) => state.purchases.purchases);

    const [selectedProducts, setProduct] = useState('');
    const [selectedCustomers, setCustomer] = useState('');
    const [selectedDates, setDate] = useState('');
    const [ searchCustomers, setSearchCustomers ] = useState('');
    const [ searchProducts, setSearchProducts ] = useState('');

  // Search customers
  const searchCustomersTable = () => {
    const searchCustomer = selectedCustomers.toLowerCase();
    const filteredCustomers = customers.filter((customer) =>
      customer.firstName.toLowerCase() === searchCustomer
    );
    setSearchCustomers(filteredCustomers);
  };

  // Search products
  const searchProductsTable = () => {
    const searchProduct = selectedProducts.toLowerCase();
    const filteredProducts = products.filter((product) =>
      product.name.toLowerCase() === searchProduct
    );
    setSearchProducts(filteredProducts);
  };

  // Search table
  const searchTable = () => {
    searchCustomersTable();
    searchProductsTable();
    console.log(searchCustomers + ' ' + searchProducts);
  };



  return (
    <div className='container'>
        <h2 className='page-title'>
            Purchases
        </h2>
        <div className='row d-flex'>
            <div className='col-6'>
                <select name="products" className='combobox' onChange={ (e) => { setProduct(e.target.value) }}>
                    <option value="">Select Product</option>
                    {products.map((product) => (
                        <option key={product.id}>{product.name}</option>
                    ))}
                </select>
            </div>
            <div className='col-6'>
                <select name="customers" className='combobox' onChange={ (e) => { setCustomer(e.target.value)}}>
                <option value="">Select Customer</option>
                    {customers.map((customer) => (
                        <option key={customer.id}>{customer.firstName}</option>
                    ))}
                </select>
            </div>
            <div className=''>
                <button className='btn btn-primary search' onClick={ () => searchTable() }>Search</button>
            </div>
        </div>
        { (searchCustomers.length > 0 || searchProducts.length > 0) && (
            <div className='purchases-table'>
                <table className='table-style'>
                <thead>
                    <tr>
                    <th>Customer Name</th>
                    <th>Product Name</th>
                    {/* Add more headers if needed */}
                    </tr>
                </thead>
                <tbody>
                    {/* Display filtered customers */}
                    {searchCustomers.map((customer) => (
                    <tr key={customer.id}>
                        <td>{customer.firstName}</td>
                        <td></td> {/* Add more columns if needed */}
                    </tr>
                    ))}
                    
                    {/* Display filtered products */}
                    {searchProducts.map((product) => (
                    <tr key={product.id}>
                        <td></td> {/* Add more columns if needed */}
                        <td>{product.name}</td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
            )}

    </div>
  )
}

export default PurchaseViewer