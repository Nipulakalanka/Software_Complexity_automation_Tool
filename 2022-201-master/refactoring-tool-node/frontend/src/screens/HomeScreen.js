import React from "react";
import FileUpload from "../components/FileUpload";
import ToastContainer from "../components/ToastContainer";

function HomeScreen() {
  return (
    <div>
      <FileUpload />
      <ToastContainer />
    </div>
  );
}

export default HomeScreen;
