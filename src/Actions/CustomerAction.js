// CustomerAction.js

// Action types
export const UPDATE_CUSTOMER = 'UPDATE_CUSTOMER';
export const DELETE_CUSTOMER = 'DELETE_CUSTOMER';

// Action creators
export const updateCustomer = (customerId, updatedCustomerData) => {
    console.log(updatedCustomerData);
    return {
    type: UPDATE_CUSTOMER,
    payload: {
      customerId,
      updatedCustomerData,
    },
  };
};

export const deleteCustomer = (customerId) => {
    console.log(customerId);
  return {
    type: DELETE_CUSTOMER,
    payload: {
      customerId,
    },
  };
};
