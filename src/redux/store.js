import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./features/themeSlice";
import boardsReducer from "./features/boardsSlice";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    boards: boardsReducer,
  },
});
