import React from "react";
import { ToastContainer as TC } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ToastContainer() {
  return (
    <TC
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  );
}

export default ToastContainer;
