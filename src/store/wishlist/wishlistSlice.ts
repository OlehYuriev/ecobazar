import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import IProduct from "@/interface/IProduct";

export interface BasketState {
  productsWishlist: IProduct[];
}
const initialState: BasketState = {
  productsWishlist: [],
};

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addProductWIshlist: (state, action: PayloadAction<IProduct>) => {
      const existingProductIndex = state.productsWishlist.findIndex(
        (product) => product.name === action.payload.name
      );

      if (existingProductIndex !== -1) {
        state.productsWishlist[existingProductIndex].quantity +=
          action.payload.quantity;
      } else {
        state.productsWishlist.push(action.payload);
      }
    },

    removeProductWIshlist: (state, action: PayloadAction<IProduct>) => {
      const index = state.productsWishlist.findIndex(
        (product) => product.name === action.payload.name
      );
      if (index !== -1) {
        state.productsWishlist.splice(index, 1);
      }
    },
    clearWIshlist: (state) => {
      state.productsWishlist = [];
    },
  },
});

export const { addProductWIshlist, removeProductWIshlist, clearWIshlist } =
  wishlistSlice.actions;

export default wishlistSlice.reducer;
