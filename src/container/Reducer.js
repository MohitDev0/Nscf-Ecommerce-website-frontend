import { AddProductToCart, ManageCount } from "./Constants";

const initialState = {
  user: {
    userCardItems: [],
  }
}
export default function userData(state = initialState, action) {
  switch (action.type) {
    case AddProductToCart:
      return {
        ...state,
        user: {
          ...state.user,
          userCardItems: [...state.user.userCardItems, action.payload],
        }
      }

    case ManageCount:
      const updateCount = state.user.userCardItems.map((elm) => {
        if (elm.productId === action.payload.productId) {
          return { ...elm, productCount: action.payload.productCount }
        }
        return elm
      })

      return {
        ...state,
        user: {
          ...state.user,
          userCardItems: updateCount
        }
      }

    default:
      return state;
  }
}