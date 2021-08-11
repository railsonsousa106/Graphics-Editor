import { createSlice } from "@reduxjs/toolkit";
import { THEMES } from "../../constants";

const initialState = {
  currentTheme: THEMES.DARK,
};

export const slice = createSlice({
  name: "themeReducer",
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.currentTheme = action.payload;
    },
  },
});

export const { setTheme } = slice.actions;

export default slice.reducer;
