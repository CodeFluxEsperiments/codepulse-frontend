import { configureStore, createSlice } from '@reduxjs/toolkit';

// Create response slice
const responseSlice = createSlice({
  name: 'response',
  initialState: {
    data: null,
    loading: false,
    error: null,
    time: 0,
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
    },
  },
});

// Create ui slice for theme handling
const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    theme: {
      mode: 'light', // Initial theme mode
    },
  },
  reducers: {
    toggleThemeMode: (state) => {
      state.theme.mode = state.theme.mode === 'dark' ? 'light' : 'dark';
    },
  },
});

// Export actions
export const { fetchResponseRequest, fetchResponseSuccess, fetchResponseFailure } = responseSlice.actions;
export const { toggleThemeMode } = uiSlice.actions;

// Create store with Redux Toolkit's configureStore
const store = configureStore({
  reducer: {
    response: responseSlice.reducer,
    ui: uiSlice.reducer, // Add the uiSlice reducer here
  },
});

export default store;
