import { configureStore } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

// Create response slice
const responseSlice = createSlice({
  name: 'response',
  initialState: {
    data: null,
    loading: false,
    error: null,
    time: 0
  },
  reducers: {
    fetchResponseRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchResponseSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.time = action.meta?.time || Date.now();
    },
    fetchResponseFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
  }
});

// Export the actions
export const { 
  fetchResponseRequest, 
  fetchResponseSuccess, 
  fetchResponseFailure 
} = responseSlice.actions;

// Create store with Redux Toolkit's configureStore
const store = configureStore({
  reducer: {
    response: responseSlice.reducer,
    // Add other reducers here
  },
  // Optional middleware configuration
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(yourCustomMiddleware),
});

export default store;