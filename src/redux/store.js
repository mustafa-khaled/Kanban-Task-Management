import { configureStore } from "@reduxjs/toolkit";
import boardsReducer from "./boardsSlice";
import themeReducer from "./themeSlice";

const store = configureStore({
  reducer: {
    boards: boardsReducer.reducer,
    theme: themeReducer,
  },
});

export default store;
