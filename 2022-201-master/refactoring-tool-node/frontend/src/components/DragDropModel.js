import React, { useRef, useState } from "react";
import { ImageConfig } from "../configs/ImageConfig";
import "../styles/drop-file-input.css";
import uploadImg from "../assets/cloud-upload-regular-240.png";
import { errorToast } from ".././helpers/toastHelper";
import axios from "../configs/axios";

function DragDropModel({ callbackFunction }) {
  const wrapperRef = useRef(null);

  const [fileList, setFileList] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [resultList, setResultList] = useState([]);

  const onDragEnter = () => wrapperRef.current.classList.add("dragover");

  const onDragLeave = () => wrapperRef.current.classList.remove("dragover");

  const onDrop = () => wrapperRef.current.classList.remove("dragover");

  const onFileDrop = (e) => {
    const newFile = e.target.files[0];
    setSelectedFile(newFile);
    if (newFile) {
      if (newFile.type.split("/")[1] !== "javascript") {
        errorToast("Only javascript files are allowed");
        return;
      }
      const updatedList = [newFile];
      setFileList(updatedList);
    }
  };

  const fileRemove = (file) => {
    const updatedList = [...fileList];
    updatedList.splice(fileList.indexOf(file), 1);
    setFileList(updatedList);
  };

  const onAnalyzeHandler = () => {
    setIsLoading(true);

    const data = new FormData();
    data.append("file", selectedFile);
    data.append("filename", "data.js");

    // sending first request to upload the file
    axios
      .post("/upload", data)
      .then(async (res) => {
        if (res.status === 200) {
          // sending second request to validate the file
          await axios
            .get("/validation")
            .then((res) => {
              // setTimeout(() => {
              //   console.log(res.data?.response);
              //   setResultList(res.data?.response);
              // }, 4000);
              console.log(res.data?.response);
              setResultList(res.data?.response);
            })
            .catch((error) => {
              errorToast(
                error.response?.data?.message || "Something went wrong"
              );
              setIsLoading(false);
              console.log(error.response);
            });
          return;
        }
        errorToast(res.data?.message || "Something went wrong");
        setIsLoading(false);
        console.log(res.data);
      })
      .catch((error) => {
        errorToast(error.response?.data?.message || "Something went wrong");
        setIsLoading(false);
        console.log(error.response);
      });
  };

  const duration = 2000; // ms
  const delay = 500; // ms

  const animStr = (i) =>
    `fadeIn ${duration}ms ease-out ${delay * i}ms forwards`;

  return (
    <>
      {!isLoading ? (
        <>
          <div
            ref={wrapperRef}
            className="drop-file-input"
            onDragEnter={onDragEnter}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
          >
            <div className="drop-file-input__label">
              <img src={uploadImg} alt="" />
              <p>Drag & Drop your files here</p>
            </div>
            <input type="file" value="" onChange={onFileDrop} />
          </div>
          {fileList.length > 0 ? (
            <div className="drop-file-preview">
              <p className="drop-file-preview__title">Ready to upload</p>
              {fileList.map((item, index) => (
                <div key={index} className="drop-file-preview__item">
                  <img
                    src={
                      ImageConfig[item.type.split("/")[1]] ||
                      ImageConfig["default"]
                    }
                    alt=""
                  />
                  <div className="drop-file-preview__item__info">
                    <p>{item.name}</p>
                    <p>{item.size}B</p>
                  </div>
                  <span
                    className="drop-file-preview__item__del"
                    onClick={() => fileRemove(item)}
                  >
                    x
                  </span>
                </div>
              ))}
            </div>
          ) : null}
          {fileList.length > 0 && (
            <span className="flex justify-center">
              <button
                type="button"
                className="bg-blue-600 text-white py-2 px-4 rounded-full cursor-pointer hover:bg-blue-800 duration-300"
                onClick={onAnalyzeHandler}
              >
                Upload & Analyze
              </button>
            </span>
          )}
        </>
      ) : (
        <div>
          {resultList.length === 0 ? (
            <>
              <img
                style={{ width: "400px" }}
                src="https://i.pinimg.com/originals/ce/ca/e6/cecae62ec79ddc1d9d95c3131510f3e6.gif"
              />
              <div
                style={{
                  textAlign: "center",
                  fontSize: 20,
                  fontWeight: "bold",
                }}
              >
                Analyzing...
              </div>
            </>
          ) : (
            <div>
              <span className="font-bold text-xl">Issues Detected</span>
              <ul className="item-list">
                {resultList.map((item, index) => (
                  <li style={{ animation: animStr(index) }} key={index}>
                    ▶️ {item.text} {item.isValid ? "✅" : "❌"}
                  </li>
                ))}
              </ul>
              <div className="flex justify-center mt-5">
                <button
                  type="button"
                  className="bg-blue-600 text-white py-2 px-4 rounded-full cursor-pointer hover:bg-blue-800 duration-300"
                  onClick={() =>
                    callbackFunction(
                      resultList[0].isValid,
                      resultList[1].isValid,
                      resultList[2].isValid,
                      resultList[3].isValid,
                      resultList[4].isValid,
                      selectedFile
                    )
                  }
                >
                  Open Refactor Tool
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default DragDropModel;
