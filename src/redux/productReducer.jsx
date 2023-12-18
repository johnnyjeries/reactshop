import { generateUniqueId } from "../utils";

const initialState = {
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

const productsReducer = (state = initialState, action) => {
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

    case 'EDIT_PRODUCT':
      return {
        ...state,
        products: state.products.map((product) =>
          product.id === action.payload.id
            ? {
                ...product,
                name: action.payload.name,
                price: action.payload.price,
                quantity: action.payload.quantity,
              }
            : product
        ),
      };

    case 'DELETE_PRODUCT':
      return {
        ...state,
        products: state.products.filter((product) => product.id !== action.payload.id),
      };

    default:
      return state;
  }
};

export default productsReducer;