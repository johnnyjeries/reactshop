// rootReducer.jsx
import { combineReducers } from 'redux';
import { generateUniqueId } from "../utils";

// Initial state for products

let productIdCounter = 1;

const initialProductsState = {
  products: [
    {
      id: generateUniqueId(),
      name: 'laptop',
      price: 5000,
      quantity: 1
    },
    {
      id: generateUniqueId(),
      name: 'iphone',
      price: 3200,
      quantity: 1
    }
  ]
};

// Products reducer
const productsReducer = (state = initialProductsState, action) => {
  switch (action.type) {
    case 'ADD_PRODUCT':
      return {
        ...state,
        products: [
          ...state.products,
          {
            id: generateUniqueId(),
            name: action.payload.name,
            price: action.payload.price,
            quantity: action.payload.quantity,
          },
        ],
      };


      case 'UPDATE_PRODUCT':
        console.log('State before updating:', state.products);
  
        const updatedProducts = state.products.map((product) =>
          product.id === action.payload.productId
            ? {
                ...product,
                ...action.payload.updatedProductData,
              }
            : product
        );
  
        console.log('State after updating:', updatedProducts);
  
        return {
          ...state,
          products: updatedProducts,
        };
  
      case 'DELETE_PRODUCT':
        return {
          ...state,
          products: state.products.filter((product) => product.id !== action.payload.productId),
        };

    default:
      return state;
  }
};

// Initial state for customers
const initialCustomersState = {
  customers: [
    {
      id: 4,
      firstName: 'Johnny',
      lastName: 'Jeries',
      city: 'Haifa'
    },
    {
      id: 5,
      firstName: 'Jordi',
      lastName: 'Jeries',
      city: 'Haifa'
    }
  ]
};

// Customers reducer
const customersReducer = (state = initialCustomersState, action) => {
  switch (action.type) {
    case 'ADD_CUSTOMER':
      return {
        ...state,
        customers: [
          ...state.customers,
          {
            id: generateUniqueId(),
            firstName: action.payload.firstName,
            lastName: action.payload.lastName,
            city: action.payload.city,
          },
        ],
      };

      case 'UPDATE_CUSTOMER':
        console.log(action.payload.customerId);

        const updatedCustomers = state.customers.map((customer) =>
          customer.id == action.payload.customerId
            ? {
                ...customer,
                ...action.payload.updatedCustomerData,
              }
            : customer
        );
        console.log('Updated Customers:', updatedCustomers);
        return {
          ...state,
          customers: updatedCustomers,
        };
      


        case 'DELETE_CUSTOMER':
          console.log('Action payload for DELETE_CUSTOMER:', action.payload.customerId);
          console.log('Current state for DELETE_CUSTOMER:', state);
        
          const customerIdToDelete = action.payload.customerId;
        
          const updatedCustomersAfterDelete = state.customers.filter((customer) => customer.id !== customerIdToDelete);
        
          console.log('Updated state after deleting customer:', updatedCustomersAfterDelete);
        
          if (state.customers.find((customer) => customer.id === customerIdToDelete)) {
            console.error('Customer still present in the state after deletion!');
          } else {
            console.log('Customer successfully deleted from the state.');
            alert('customer was deleted');
          }
        
          return {
            ...state,
            customers: updatedCustomersAfterDelete,
          };
        
        default:
          return state;
        
          }
        };

const initialPurchasesState = { purchases: []};

const purchasesReducer = (state = initialPurchasesState, action) => {
  switch (action.type) {
    case 'ADD_PURCHASE':
      const newPurchase = {
        id: generateUniqueId(),
        customerId: action.payload.customerId,
        productId: action.payload.productId,
        date: action.payload.date,
      };
      // Log the state before and after adding the new purchase
      console.log('State before adding:', state.purchases);
      const newState = [...state.purchases, newPurchase];
      console.log('State after adding:', newState);
      return { purchases: newState };

      case 'DELETE_PURCHASE':
        // Log the state before and after deleting the purchase
        console.log('State before deleting:', state.purchases);
        const newStateAfterDelete = state.purchases.filter((purchase) => purchase.id !== action.payload.purchaseId);
        console.log('State after deleting:', newStateAfterDelete);
        return { purchases: newStateAfterDelete };
  
      default:
        return state;
    }
};


// Combine all reducers into the root reducer
const rootReducer = combineReducers({
  products: productsReducer,
  customers: customersReducer,
  purchases: purchasesReducer,
  // Add purchasesReducer here if you have one
});

export default rootReducer;
