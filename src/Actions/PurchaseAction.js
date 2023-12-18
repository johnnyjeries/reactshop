// PurchaseAction.js

// Action types
export const ADD_PURCHASE = 'ADD_PURCHASE';
export const DELETE_PURCHASE = 'DELETE_PURCHASE';

// Action creators
export const addPurchase = (customerId, productId, date) => {
  return {
    type: ADD_PURCHASE,
    payload: {
      customerId,
      productId,
      date,
    },
  };
};

export const deletePurchase = (purchaseId) => {
  return {
    type: DELETE_PURCHASE,
    payload: {
      purchaseId,
    },
  };
};
