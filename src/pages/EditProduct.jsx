// EditProduct.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateProduct, deleteProduct } from '../Actions/ProductAction';

// Utility function to get product name by ID
const getProductNameById = (products, productId) => {
  const product = products.find((product) => product.id == productId);
  return product ? product.name : 'No Product Found';
};

const EditProduct = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const customers = useSelector((state) => state.customers.customers);
  const purchases = useSelector((state) => state.purchases.purchases);

  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');

  useEffect(() => {
    // Fetch product data based on productId and set the form fields
    const product = products.find((product) => product.id == productId);
    if (product) {
      setProductName(product.name);
      setProductPrice(product.price);
      console.log(product.name);
    }
  }, [productId, products]);

  const handleUpdateProduct = () => {
    // Dispatch action to update product in the Redux store
    dispatch(updateProduct(productId, { name: productName, price: +productPrice }));
  };

  const handleDeleteProduct = () => {
    // Dispatch action to delete product in the Redux store
    dispatch(deleteProduct(productId));
  };

  return (
    <div className="container" style={{ padding: '10px' }}>
      <h2 className="page-title">Edit Product</h2>
      <div className="row">
        <div className="col-6">
          <h4>Update Product</h4>
          <form>
            <div className="form-group">
              <label htmlFor="productName">Product Name</label>
              <input
                type="text"
                className="form-control"
                id="productName"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="productPrice">Product Price</label>
              <input
                type="text"
                className="form-control"
                id="productPrice"
                value={productPrice}
                onChange={(e) => setProductPrice(e.target.value)}
              />
            </div>
            <button type="button" className="btn btn-primary" onClick={handleUpdateProduct}>
              Update Product
            </button>
            <button type="button" className="btn btn-danger" onClick={handleDeleteProduct}>
              Delete Product
            </button>
          </form>
        </div>
        <div className="col-6">
          <h4>Customers who purchased this product</h4>
          <ul>
          {purchases
            .filter((purchase) => purchase.productId === productId)
            .map((purchase) => {
              const customer = customers.find((customer) => customer.id == purchase.customerId);
              const productName = getProductNameById(products, productId);
              return (
                <li key={customer.id}>
                  <Link to={`/editCustomer/${customer.id}`}>
                    {`${customer.firstName} ${customer.lastName} - ${productName}`}
                  </Link>
                </li>
              );
            })}


          </ul>
        </div>

      </div>
    </div>
  );
};

export default EditProduct;
