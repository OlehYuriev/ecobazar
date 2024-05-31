import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import IProduct from "@/interface/IProduct";

export interface BasketState {
  productsBasket: IProduct[];
}
const initialState: BasketState = {
  productsBasket: [],
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<IProduct>) => {
      const existingProductIndex = state.productsBasket.findIndex(
        (product) => product.name === action.payload.name
      );

      if (existingProductIndex !== -1) {
        state.productsBasket[existingProductIndex].quantity +=
          action.payload.quantity;
      } else {
        state.productsBasket.push(action.payload);
      }
    },
    addQuantity: (state, action: PayloadAction<IProduct>) => {
      const product = state.productsBasket.find(
        (product) => product.name === action.payload.name
      );
      if (product) {
        product.quantity += 1;
      }
    },
    subtractQuantity: (state, action: PayloadAction<IProduct>) => {
      const product = state.productsBasket.find(
        (product) => product.name === action.payload.name
      );
      if (product && product.quantity > 1) {
        product.quantity -= 1;
      }
    },

    removeProduct: (state, action: PayloadAction<IProduct>) => {
      const index = state.productsBasket.findIndex(
        (product) => product.name === action.payload.name
      );
      if (index !== -1) {
        state.productsBasket.splice(index, 1);
      }
    },
    clearBasket: (state) => {
      state.productsBasket = [];
    },
  },
});

export const {
  addProduct,
  addQuantity,
  subtractQuantity,
  removeProduct,
  clearBasket,
} = basketSlice.actions;

export default basketSlice.reducer;
