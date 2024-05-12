import { createSlice } from "@reduxjs/toolkit";

export const mediaSlice = createSlice({
  name: "media",
  initialState: {
    mediaFiles: [],
  },
  reducers: {
    setMediaFiles: (state, action) => {
      state.mediaFiles = action.payload;
    },
  },
});

export const { setMediaFiles } = mediaSlice.actions;

export default mediaSlice.reducer;
