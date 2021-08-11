import { createSlice } from "@reduxjs/toolkit";
import { TOOLS } from "../../constants";

const initialState = {
  color: "#000",
  fill: "transparent",
  tool: TOOLS.SELECT.name,
  mode: null,
  strokeWidth: 1,
  strokeType: "LINEAR",
  frameSize: {
    width: 700,
    height: 500,
  },
};

export const slice = createSlice({
  name: "boardReducer",
  initialState,
  reducers: {
    setColor: (state, action) => {
      state.color = action.payload;
    },
    setFill: (state, action) => {
      state.fill = action.payload;
    },
    setTool: (state, action) => {
      state.tool = action.payload;
    },
    setMode: (state, action) => {
      state.mode = action.payload;
    },
    setStrokeType: (state, action) => {
      state.strokeType = action.payload;
    },
    setFrameSize: (state, action) => {
      state.frameSize = action.payload;
    },
    setStrokeWidth: (state, action) => {
      state.strokeWidth = action.payload;
    },
  },
});

export const {
  setColor,
  setFill,
  setTool,
  setMode,
  setStrokeType,
  setFrameSize,
  setStrokeWidth,
} = slice.actions;

export default slice.reducer;
