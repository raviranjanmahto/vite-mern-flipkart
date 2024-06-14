import React from "react";
import ReactDOM from "react-dom/client";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";

import App from "./App.jsx";
import "./index.css";
import store from "./app/store.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      <ToastContainer position='top-center' />
    </Provider>
  </React.StrictMode>
);
