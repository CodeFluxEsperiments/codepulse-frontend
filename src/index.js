import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import { ThemeProvider, CssBaseline, createTheme } from "@mui/material";

import App from "./App";
import store from "./store/store";

const DynamicThemeProvider = ({ children }) => {
  const mode = useSelector((state) => state.ui.theme.mode); // Get theme mode from Redux
  const theme = createTheme({
    palette: {
      mode, // Use 'light' or 'dark' mode dynamically
    },
  });

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <DynamicThemeProvider>
          <CssBaseline />
          <App />
        </DynamicThemeProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);