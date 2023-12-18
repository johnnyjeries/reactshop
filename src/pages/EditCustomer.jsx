// EditCustomer.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
// import { updateCustomer, deleteCustomer } from '../Actions/CustomerAction';
// import { deletePurchase } from '../Actions/PurchaseAction';
import { updateCustomer, deleteCustomer } from '../Actions/CustomerAction';
import { deletePurchase } from '../Actions/PurchaseAction';



const getProductNameById = (products, productId) => {
    const product = products.find((product) => product.id == productId);
    return product ? product.name : 'No Product Found';
  };

const EditCustomer = () => {
  const { customerId } = useParams();
  const dispatch = useDispatch();
  const customers = useSelector((state) => state.customers.customers);
  const products = useSelector((state) => state.products.products);
  const purchases = useSelector((state) => state.purchases.purchases);

  const [customerFirstName, setCustomerFirstName] = useState('');
  const [customerLastName, setCustomerLastName] = useState('');

  useEffect(() => {
    // Fetch customer data based on customerId and set the form fields
    const customer = customers.find((customer) => customer.id == customerId);
    if (customer) {
      setCustomerFirstName(customer.firstName);
      setCustomerLastName(customer.lastName);
    }
  }, [customerId, customers]);

  const handleUpdateCustomer = () => {
    // Dispatch action to update customer in the Redux store
    dispatch(updateCustomer(customerId, { firstName: customerFirstName, lastName: customerLastName, city: '' }));
  };

  const handleDeleteCustomer = () => {
    // Dispatch action to delete customer in the Redux store
    dispatch(deleteCustomer(customerId));

    // Delete related purchases
    const customerPurchases = purchases.filter((purchase) => purchase.customerId == customerId);
    customerPurchases.forEach((purchase) => dispatch(deletePurchase(purchase.id)));
  };

  return (
    <div className="container" style={{ padding: '10px' }}>
      <h2 className="page-title">Edit Customer</h2>
      <div className="row">
        <div className="col-6">
          <h4>Update Customer</h4>
          <form>
            <div className="form-group">
              <label htmlFor="customerFirstName">First Name</label>
              <input
                type="text"
                className="form-control"
                id="customerFirstName"
                value={customerFirstName}
                onChange={(e) => setCustomerFirstName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="customerLastName">Last Name</label>
              <input
                type="text"
                className="form-control"
                id="customerLastName"
                value={customerLastName}
                onChange={(e) => setCustomerLastName(e.target.value)}
              />
            </div>
            <button type="button" className="btn btn-primary" onClick={handleUpdateCustomer}>
              Update Customer
            </button>
            <button type="button" className="btn btn-danger" onClick={handleDeleteCustomer}>
              Delete Customer
            </button>
          </form>
        </div>
        <div className="col-6">
          <h4>Purchased Products</h4>
          <ul>
            {purchases
              .filter((purchase) => purchase.customerId == customerId)
              .map((purchase) => {
                const productName = getProductNameById(products, purchase.productId);
                return (
                  <li key={purchase.id}>
                    <Link to={`/editProduct/${purchase.productId}`}>
                      {`${productName} - ${purchase.date}`}
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

export default EditCustomer;
