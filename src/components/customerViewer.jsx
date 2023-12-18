  import { useSelector, useDispatch } from 'react-redux';
  import { useState } from 'react';
  import { useEffect } from 'react';
  import { Link } from 'react-router-dom';
  import ProductCombobox from './ProductCombobox';


  const CustomerViewer = () => {
    const getProductIdFromCombobox = (theId) =>{
      getProductId(theId);
    }
    const customers = useSelector((state) => state.customers.customers);
    const products = useSelector((state) => state.products.products);
    const purchases = useSelector((state) => state.purchases);
    // const [addClicked, setAddClicked] = useState('');
    const [productId, getProductId] = useState('');
    // const [customerId, getCustomerId] = useState('');
    // const [customerName, getCustomerName] = useState('');
    const dispatch = useDispatch();
    // const [purchasedProductId, setPurchasedProductId] = useState('');
  
    useEffect(() => {
      // This code will run whenever the purchases state changes
      console.log('Updated purchases:', purchases);
    }, [purchases]);
    
    // const addProductToCustomer = () => {

    //   if (productId || customerId) {
    //     const today = new Date();
    //     const formattedDate = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;  
    //     dispatch(addPurchase(customerId, productId, formattedDate));

    //   } else {
    //     console.error('No product selected');
    //   }

    // }

    return (
      <div className='container' style={{ padding: '10px' }}>
        <h2 className='page-title'>Customers</h2>
        <table className='table-style'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Products</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id}>
                <td>{`${customer.firstName} ${customer.lastName}`}</td>
                <td>
                <Link to={`/EditProduct/${productId}`}>
                  {purchases && purchases.purchases && Array.isArray(purchases.purchases)
                    ? purchases.purchases
                        .filter((purchase) => purchase.customerId == customer.id)
                        .map((purchase) => {
                          const purchasedProduct = products.find((product) => product.id == purchase.productId);
                          return (
                              <p key={purchase.id}>{purchasedProduct ? purchasedProduct.name : 'No Products Found'}</p>
                              );
                        })
                    : 'No purchases available'}
                </Link>

              </td>
              <td>
                {purchases && purchases.purchases && Array.isArray(purchases.purchases)
                  ? purchases.purchases
                      .filter((purchase) => purchase.customerId === customer.id)
                      .map((purchase) => <p key={purchase.id}>{purchase.date}</p>)
                  : 'No purchases available'}
              </td>              
            </tr>
            ))}
          </tbody>
        </table>
        <br/>
        <ProductCombobox callback={getProductIdFromCombobox}></ProductCombobox>
      </div>
    );
  };

  export default CustomerViewer;
