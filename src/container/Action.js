import { AddProductToCart, ManageCount } from "./Constants.js";
export const Add_product_to_cart = (data) => {
  return {
    type: AddProductToCart,
    payload: data,
  }

}

export const Increment_count = (data) => {
  return {
    type: ManageCount,
    payload: data,
  }
}