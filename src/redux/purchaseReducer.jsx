import { generateUniqueId } from "../utils";

const purchasesState = {
  purchases: [
    {
      id: generateUniqueId(),
      customerId: 'Johnny',
      productId: 'Jeries',
      date: 'Haifa'
    },
    {
      id: generateUniqueId(),
      customerId: 'Jordi',
      productId: 'Jeries',
      date: 'Haifa'
      }
  ]
};

const purchaseReducer = (state = purchasesState, action) => {
  switch (action.type) {
    case 'ADD_PURCHASE':
      return {
        ...state,
        purchases: [
          ...state.purchases,
          {
            id: generateUniqueId(),
            name: action.payload.name,
            price: action.payload.price,
            quantity: action.payload.quantity,
          },
        ],
      };

    case 'EDIT_PURCHASE':
      return {
        ...state,
        purchases: state.purchases.map((purchase) =>
          purchase.id === action.payload.id
            ? {
                ...purchase,
                name: action.payload.name,
                price: action.payload.price,
                quantity: action.payload.quantity,
              }
            : purchase
        ),
      };

    case 'DELETE_PURCHASE':
      return {
        ...state,
        purchases: state.purchases.filter((purchase) => purchase.id !== action.payload.id),
      };

    default:
      return state;
  }
};

export default purchaseReducer;