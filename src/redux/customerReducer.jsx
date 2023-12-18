import { generateUniqueId } from "../utils";

const customerState = {
  customers: [
    {
      id: generateUniqueId(),
      firstName: 'Johnny',
      lastName: 'Jeries',
      city: 'Haifa'
    },
    {
      id: generateUniqueId(),
      firstName: 'Jordi',
      lastName: 'Jeries',
      city: 'Haifa'
      }
  ]
};

const customerReducer = (state = customerState, action) => {
  switch (action.type) {
    case 'ADD_CUSTOMER':
      return {
        ...state,
        customers: [
          ...state.customers,
          {
            id: generateUniqueId(),
            name: action.payload.name,
            price: action.payload.price,
            quantity: action.payload.quantity,
          },
        ],
      };

    case 'EDIT_CUSTOMER':
      return {
        ...state,
        customers: state.customers.map((customer) =>
          customer.id === action.payload.id
            ? {
                ...customer,
                name: action.payload.name,
                price: action.payload.price,
                quantity: action.payload.quantity,
              }
            : customer
        ),
      };

    case 'DELETE_CUSTOMER':
      return {
        ...state,
        customers: state.customers.filter((customer) => customer.id !== action.payload.id),
      };

    default:
      return state;
  }
};

export default customerReducer;