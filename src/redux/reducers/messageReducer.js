import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  msg: null,
  type: "error", //'success', 'warning'
  timeout: -1,
};

export const slice = createSlice({
  name: "messageReducer",
  initialState,
  reducers: {
    setMessage: (state, action) => {
      state.msg = action.payload.message;
      state.type = action.payload.type || "error";
      state.timeout = action.payload.timeout || 3000;
    },
  },
});

export const { setMessage } = slice.actions;

export default slice.reducer;
