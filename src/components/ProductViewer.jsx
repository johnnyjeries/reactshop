import {React, useState} from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ProductCombobox from './ProductCombobox';

const ProductViewer = () => {
  const getProductIdFromCombobox = (theId) =>{
    getProductId(theId);
  }
  const products = useSelector((state) => state.products.products);
  const purchases = useSelector((state) => state.purchases.purchases);
  const customers = useSelector((state) => state.customers.customers);
  const [addClicked, setAddClicked] = useState('');
  const [productId, getProductId] = useState('');


  const getPurchaseDate = (productId, customerId) => {
    const purchase = purchases.find((purchase) => purchase.productId === productId && purchase.customerId === customerId);
    return purchase ? purchase.date : 'No purchase date found';
  };

  const getCustomersForProduct = (productId) => {
    const productPurchases = purchases.filter((purchase) => purchase.productId === productId);
    const customerIds = productPurchases.map((purchase) => purchase.customerId);
    const uniqueCustomerIds = [...new Set(customerIds)]; // Remove duplicates
    const customersForProduct = uniqueCustomerIds.map((customerId) =>
      customers.find((customer) => customer.id === customerId)
    );
    return customersForProduct;
  };

  return (
    <div className="row" style={{ textAlign: 'center' }}>
      <h2 className="page-title">Products</h2>
      <h4 style={{ textAlign: 'left', marginBottom: '30px' }}>Amount of purchased products: {purchases.length}</h4>
      {products.map((product) => (
        <div className="col-6 product-div row" key={product.id}>
          <div className="">
            <Link to={`/editProduct/${product.id}`}>
              <p>Name: {product.name}</p>
            </Link>
            <p>Price: {product.price}</p>
            <p>Quantity: {product.quantity}</p>
          </div>
          <div className="col-12 mt-3">
            <h4>Customers who bought this product:</h4>
            <ul>
              {getCustomersForProduct(product.id).map((customer) => (
                <li key={customer.id}>
                  <Link to={`/editCustomer/${customer.id}`}>
                    {`${customer.firstName} ${customer.lastName} - ${getPurchaseDate(product.id, customer.id)}`}
                  </Link>
                </li>
              ))}
            </ul>
            <ProductCombobox callback={getProductIdFromCombobox}></ProductCombobox>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductViewer;
