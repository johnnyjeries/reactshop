// actions/ProductActions.js

// Action creator for updating a product
export const updateProduct = (productId, updatedProductData) => {
    return {
      type: 'UPDATE_PRODUCT',
      payload: {
        productId,
        updatedProductData,
      },
    };
  };
  
  // Action creator for deleting a product
  export const deleteProduct = (productId) => {
    return {
      type: 'DELETE_PRODUCT',
      payload: {
        productId,
      },
    };
  };
  