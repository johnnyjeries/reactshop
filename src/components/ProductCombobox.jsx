import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { addPurchase } from '../Actions/PurchaseAction';

const ProductCombobox = ({callback}) => {

    const customers = useSelector((state) => state.customers.customers);
    const products = useSelector((state) => state.products.products);
    const purchases = useSelector((state) => state.purchases);
    const [addClicked, setAddClicked] = useState('');
    const [productId, getProductId] = useState('');
    const [customerId, getCustomerId] = useState('');
    const [customerName, getCustomerName] = useState('');
    const dispatch = useDispatch();


    useEffect(() => {
        // This code will run whenever the purchases state changes
        console.log('Updated purchases:', purchases);
      }, [purchases]);

    const addProductToCustomer = (e) => {
        callback(productId);
        if (productId || customerId) {
          const today = new Date();
          const formattedDate = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;  
          dispatch(addPurchase(customerId, productId, formattedDate));
  
        } else {
          console.error('No product selected');
        }
  
      }

  return (

<div>
<   h4 className='mini-title'>Add Products to Customer</h4>
    <div className='row'>
        {customers.map((customer) => (
        <div className='col-6' key={customer.id}>
            <p>{customer.firstName + ' ' + customer.lastName}</p>
            <button onClick={ () => {setAddClicked('Add'); getCustomerId(customer.id); getCustomerName(customer.firstName);}}className='btn btn-primary'>Add Product to {customer.firstName}</button>
        </div>
        ))}
    </div>
    { addClicked &&
    <div style={{marginTop: '20px'}}>
        <h4>Add Product for {customerName}</h4>
        <select className='combobox' name="" onChange={(e) => getProductId(e.target.value)}>
        <option value="">Select Product</option>
        {products.map((product) => (
            <option key ={product.id} value={product.id}>{product.name}</option>
        ))}
        </select>
        <button onClick={() => addProductToCustomer()} style={{marginLeft: '10px'}} className='btn btn-success'>Buy</button>
    </div>
    }
</div>

    )
}

export default ProductCombobox