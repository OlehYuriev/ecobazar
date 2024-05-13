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

      // Если продукт уже существует, не добавляем его
      if (existingProductIndex === -1) {
        state.productsBasket.push(action.payload);
      }
    },
    addQuantity: (state, action: PayloadAction<IProduct>) => {
      const { name } = action.payload;
      const updatedProductsBasket = state.productsBasket.map((product) => {
        if (product.name === name) {
          const updatedQuantity = product.quantity + 1;
          const updatedPrice = parseFloat(
            ((product.price * updatedQuantity) / product.quantity).toFixed(2)
          ); // Ограничение до 2 цифр после точки
          return { ...product, quantity: updatedQuantity, price: updatedPrice };
        }
        return product;
      });
      state.productsBasket = updatedProductsBasket;
    },

    subtractQuantity: (state, action: PayloadAction<IProduct>) => {
      const { name } = action.payload;
      const updatedProductsBasket = state.productsBasket.map((product) => {
        if (product.name === name && product.quantity > 1) {
          const updatedQuantity = product.quantity - 1;
          const updatedPrice = parseFloat(
            ((product.price * updatedQuantity) / product.quantity).toFixed(2)
          ); // Ограничение до 2 цифр после точки
          return { ...product, quantity: updatedQuantity, price: updatedPrice };
        }
        return product;
      });
      state.productsBasket = updatedProductsBasket;
    },

    removeProduct: (state, action: PayloadAction<IProduct>) => {
      const index = state.productsBasket.findIndex(
        (product) => product.name === action.payload.name
      );
      if (index !== -1) {
        state.productsBasket.splice(index, 1);
      }
    },
  },
});

export const { addProduct, addQuantity, subtractQuantity, removeProduct } =
  basketSlice.actions;

export default basketSlice.reducer;
