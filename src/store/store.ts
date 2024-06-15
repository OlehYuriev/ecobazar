import { configureStore } from "@reduxjs/toolkit";
import basketReducer from "./basket/basketSlice";
import searchReducer from "./search/searchSlice";
import currencyReducer from "./currency/currencySlice";
import wishlistReducer from "./wishlist/wishlistSlice";

export const store = configureStore({
  reducer: {
    basket: basketReducer,
    search: searchReducer,
    currency: currencyReducer,
    wishlist: wishlistReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
