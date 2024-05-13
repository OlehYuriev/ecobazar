import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface BasketState {
  productsSearch: string;
}
const initialState: BasketState = {
  productsSearch: "",
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    searchProduct: (state, action: PayloadAction<string>) => {
      state.productsSearch = action.payload;
    },
  },
});

export const { searchProduct } = searchSlice.actions;

export default searchSlice.reducer;
