import React, { useEffect, useState } from 'react'
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
    const [ searchClicked, setSearchClicked ] = useState('');
    const [purchasedProducts, setPurchasedProducts] = useState([]);
    const [ purchasesDetails, setPurchasesDetails] = useState([]);
    const [ selectedPurchasedProduct, setPurchaseSelectedProduct] = useState([]);
    const [ customerProductMatch, setCustomerProductMatch ] = useState('');

      // useEffect to handle the asynchronous state updates
    useEffect(() => {
        searchCustomersTable();
    }, [searchProducts, searchCustomers]);

  // Search customers
  const searchCustomersTable = () => {
    const searchCustomer = selectedCustomers.toLowerCase();
    const filteredCustomers = customers.filter((customer) =>
      customer.firstName.toLowerCase() === searchCustomer
    );
    setSearchCustomers(filteredCustomers);
    setPurchasedProducts([]);
    if (filteredCustomers.length > 0 ){
        const theCustomer = filteredCustomers[0];
        const selectedCustomerId = theCustomer.id;
        //get purchases
        const customerPurchases = purchases.filter((purchase) => purchase.customerId === selectedCustomerId);
        customerPurchases ? setCustomerProductMatch(true) : null;
        setPurchasesDetails(customerPurchases);
        if(searchProducts.length < 1){
            //extract products ids
            const productIds = customerPurchases.map((purchase)=> purchase.productId);
            //get products details
            const productsBoughtDetails = products.filter((product)=> productIds.includes(product.id));
            setPurchasedProducts(productsBoughtDetails);
            console.log(searchProducts);
        } else if (searchProducts.length > 0){
            const selectedProductId = searchProducts[0].id;
            const productPurchases = purchases.filter(
                (purchase) => purchase.customerId === selectedCustomerId && purchase.productId === selectedProductId
              );
              setPurchasesDetails(productPurchases);
              //get details of this selected product
              const selectedProductDetails = products.find((product) => product.id === selectedProductId);
              setPurchaseSelectedProduct([selectedProductDetails]);
              console.log(selectedProductDetails);

        }
    }
  };

  // Search products
    const searchProductsTable = () => {
        if (selectedProducts.length > 0) {
            const searchProduct = selectedProducts.toLowerCase();
            const filteredProducts = products.filter((product) =>
            product.name.toLowerCase() === searchProduct
            );
            setSearchProducts(filteredProducts);
            console.log(filteredProducts)
    } else {
        setSearchProducts(purchasedProducts);
        console.log(purchasedProducts);
    }
  };

  // Search table
  const searchTable = () => {
    searchCustomersTable();
    searchProductsTable();
    setSearchClicked(true);
  };



  return (
    <div className='container'>
        <h2 className='page-title'>
            Purchases
        </h2>
        <div className='row d-flex'>
            <div className='col-6'>
                <select name="products" className='combobox' onChange={ (e) => { setProduct(e.target.value);    setSearchClicked(false);
 }}>
                    <option value="">Select Product</option>
                    {products.map((product) => (
                        <option key={product.id}>{product.name}</option>
                    ))}
                </select>
            </div>
            <div className='col-6'>
                <select name="customers" className='combobox' onChange={ (e) => { setCustomer(e.target.value); setSearchClicked(false) }}>
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
        { (searchClicked) && (
            <div className='purchases-table'>
                <table className='table-style'>
                <thead>
                    <tr>
                    <th>Customer Name</th>
                    <th>Product Name</th>
                    <th>Purchase Date</th>
                    </tr>
                </thead>
                <tbody>
                    {searchCustomers.length > 0 ? (
                    searchCustomers.map((customer) => (
                            <tr key={customer.id}>
                                <td>{customer.firstName}</td>
                                { selectedProducts.length === 0 && searchClicked && customerProductMatch ?(
                                <>
                                    <td>
                                        { purchasedProducts.map((purchasedProduct) => (
                                        <p key={purchasedProduct.productId}>{purchasedProduct.name}</p>
                                        ))}
                                    </td>
                                    <td>
                                        {purchasesDetails.map((purchasedProduct) => (
                                        <p key={purchasedProduct.productId}>{purchasedProduct.date}</p>
                                        ))}
                                    </td>
                                </>
                                ): (
                                    <>
                                    <td>
                                        { selectedPurchasedProduct.map((purchasedProduct) => (
                                        <p key={purchasedProduct.productId}>{purchasedProduct.name}</p>
                                        ))}
                                    </td>
                                    <td>
                                        {purchasesDetails.map((purchasedProduct) => (
                                        <p key={purchasedProduct.productId}>{purchasedProduct.date}</p>
                                        ))}
                                    </td>
                                </>
                                ) }
                            </tr>
                    ))
                    ) : (
                    customers ? (
                        customers.map((customer) => (
                        <tr key={customer.id}>
                            <td>{customer.firstName}</td>
                        </tr>
                        ))
                    ) : null
                    )}
                </tbody>
                </table>
            </div>
            )}

    </div>
  )
}

export default PurchaseViewer