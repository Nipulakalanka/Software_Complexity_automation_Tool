import React, { useState } from "react";
import axios from "../configs/axios";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import DragDropModel from "./DragDropModel";
import { errorToast } from "../helpers/toastHelper";
import FloatingButton from "./FloatingButton";

const FILE_CONTENT = ``;

function FileUpload() {
  // STATES BEGIN
  const [fileContent, setFileContent] = useState(FILE_CONTENT);
  const [cleanedFileContent, setCleanedFileContent] = useState(FILE_CONTENT);

  const [open, setOpen] = useState(true);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  // states for sidebar options begin
  const [isEmptyLinesButtonVisible, setIsEmptyLinesButtonVisible] =
    useState(false);
  const [isUnusedVariablesButtonVisible, setIsUnusedVariablesButtonVisible] =
    useState(false);
  const [isEmptyMethodsButtonVisible, setIsEmptyMethodsButtonVisible] =
    useState(false);
  const [isUreachableCodeButtonVisible, setIsUreachableCodeButtonVisible] =
    useState(false);
  const [isCommentsButtonVisible, setIsCommentsButtonVisible] = useState(false);
  // states for sidebar options end

  // states for sidebar checkboxes begin
  const [isEmptyLineChecked, setIsEmptyLineChecked] = useState(false);
  const [isUnusedVariablesChecked, setIsUnusedVariablesChecked] =
    useState(false);
  const [isEmptyMethodsChecked, setIsEmptyMethodsChecked] = useState(false);
  const [isUreachableCodeChecked, setIsUreachableCodeChecked] = useState(false);
  const [isCommentsChecked, setIsCommentsChecked] = useState(false);
  // states for sidebar checkboxes end

  // STATES END

  // HANDLERS BEGIN

  // triggers when user uploads a file and sets the file content
  const onChangeHandler = (event) => {
    var file = event;
    var reader = new FileReader();

    reader.onload = function (event) {
      setFileContent(event.target.result);
    };

    reader.readAsText(file);
  };

  // triggers when user clicks on the clean button
  const onCleanEmptyHandler = () => {
    axios
      .get("/removeEmptyLines")
      .then((res) => {
        if (res.status === 200) {
          onGetCodeHandler();
          return;
        }
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // triggers when user clicks on the download icon
  const onGetCodeHandler = () => {
    axios
      .get("/getCleanedFile")
      .then((res) => {
        setCleanedFileContent(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // triggers when user clicks on remove unused variables button
  const onRemoveUnusedVariablesHandler = () => {
    axios
      .get("/removeUnusedVariables")
      .then((res) => {
        if (res.status === 200) {
          onGetCodeHandler();
          return;
        }
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // triggers when user select both options
  const onFullRefactorOptionHandler = async () => {
    console.log("STARTS");
    const request_start_at = performance.now();

    await axios
      .get("/removeUnusedVariables")
      .then(async (res) => {
        if (res.status === 200) {
          await axios
            .get("/removeEmptyLines")
            .then((res) => {
              if (res.status === 200) {
                const request_end_at = performance.now();
                const request_duration = request_end_at - request_start_at;
                console.log("ENDS", request_duration);

                onGetCodeHandler();
                return;
              }
              errorToast("Something Went Wrong");
              console.log(res.data);
            })
            .catch((error) => {
              console.log(error);
            });
          return;
        }

        errorToast("Something Went Wrong");
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
        errorToast("Something Went Wrong");
      });
  };

  // triggers when user drops a file and list the detected code smells
  const availableFeatures = (
    emptyLinsFound,
    unusedVariablesFound,
    emptyMethodsFound,
    unreachableCodeFound,
    commentsFound,
    file
  ) => {
    onCloseModal();
    setIsEmptyLinesButtonVisible(emptyLinsFound);
    setIsUnusedVariablesButtonVisible(unusedVariablesFound);
    setIsEmptyMethodsButtonVisible(emptyMethodsFound);
    setIsUreachableCodeButtonVisible(unreachableCodeFound);
    setIsCommentsButtonVisible(commentsFound);
    onChangeHandler(file);
  };

  // triggers when user clicks on apply button
  const onApplyHandler = () => {
    if (!isEmptyLineChecked && !isUnusedVariablesChecked) {
      errorToast("Please select at least one feature");
      return;
    }

    if (isEmptyLineChecked && isUnusedVariablesChecked) {
      onFullRefactorOptionHandler();
      return;
    }

    if (isEmptyLineChecked) {
      onCleanEmptyHandler();
    }

    if (isUnusedVariablesChecked) {
      onRemoveUnusedVariablesHandler();
    }
  };

  // HANDLERS BEGIN

  return (
    <div className="px-10 sm:px-12">
      <div className="grid grid-cols-1 sm:grid-cols-10 bg-gray-300 min-h-screen shadow-2xl shadow-black gap-2">
        <div className="col-span-1 sm:col-span-2 px-2 space-y-5 flex flex-col justify-between py-2">
          <span className="space-y-3">
            {isEmptyLinesButtonVisible ||
            isUnusedVariablesButtonVisible ||
            isEmptyMethodsButtonVisible ||
            isUreachableCodeButtonVisible ? (
              <span className="font-bold text-lg underline underline-offset-1 text-center flex justify-center">
                Suggested Options
              </span>
            ) : null}

            {/* SUGGESTIONS LIST BEGINS */}

            <table className="table-auto">
              <tbody className="">
                {/* from here only visible if empty lines found on the code */}
                {isEmptyLinesButtonVisible && (
                  <tr className="">
                    <td className="">
                      <input
                        type="checkbox"
                        className="h-5 w-5"
                        checked={isEmptyLineChecked}
                        onChange={() =>
                          setIsEmptyLineChecked(!isEmptyLineChecked)
                        }
                      />
                    </td>
                    <td>
                      <p className="ml-2 text-blue-700 font-medium">
                        Remove Empty Linesd
                      </p>
                    </td>
                  </tr>
                )}

                {/* to here only visible if empty lines found on the code */}

                {/* from here only visible if unused variables found on the code */}

                {isUnusedVariablesButtonVisible && (
                  <tr className="">
                    <td>
                      <input
                        type="checkbox"
                        className="h-5 w-5"
                        checked={isUnusedVariablesChecked}
                        onChange={() =>
                          setIsUnusedVariablesChecked(!isUnusedVariablesChecked)
                        }
                      />
                    </td>
                    <td>
                      <p className="ml-2 text-blue-700 font-medium">
                        Remove Unused Variables/Methods
                      </p>
                    </td>
                  </tr>
                )}

                {/* to here only visible if unused variables found on the code */}

                {/* from here only visible if empty methods found on the code */}

                {isEmptyMethodsButtonVisible && (
                  <tr className="">
                    <td>
                      <input
                        type="checkbox"
                        className="h-5 w-5"
                        checked={isEmptyMethodsChecked}
                        onChange={() =>
                          setIsEmptyMethodsChecked(!isEmptyMethodsChecked)
                        }
                      />
                    </td>
                    <td>
                      <p className="ml-2 text-blue-700 font-medium">
                        Remove Emtpy Methods
                      </p>
                    </td>
                  </tr>
                )}

                {/* to here only visible if empty methods found on the code */}

                {/* from here only visible if unreachable code found on the code */}

                {isUreachableCodeButtonVisible && (
                  <tr className="">
                    <td>
                      <input
                        type="checkbox"
                        className="h-5 w-5"
                        checked={isUreachableCodeChecked}
                        onChange={() =>
                          setIsUreachableCodeChecked(!isUreachableCodeChecked)
                        }
                      />
                    </td>
                    <td>
                      <p className="ml-2 text-blue-700 font-medium">
                        Remove Unreachable code
                      </p>
                    </td>
                  </tr>
                )}

                {/* to here only visible if unreachable code found on the code */}

                {/* from here only visible if coomments found on the code */}

                {isCommentsButtonVisible && (
                  <tr className="">
                    <td>
                      <input
                        type="checkbox"
                        className="h-5 w-5"
                        checked={isCommentsChecked}
                        onChange={() =>
                          setIsCommentsChecked(!isCommentsChecked)
                        }
                      />
                    </td>
                    <td>
                      <p className="ml-2 text-blue-700 font-medium">
                        Remove comments
                      </p>
                    </td>
                  </tr>
                )}

                {/* to here only visible if comments found on the code */}
              </tbody>
            </table>

            {/* SUGGESTIONS LIST ENDS */}

            {isEmptyLinesButtonVisible ||
            isUnusedVariablesButtonVisible ||
            isEmptyMethodsButtonVisible ||
            isUreachableCodeButtonVisible ? (
              <button
                type="button"
                className="bg-blue-600 text-white py-2 px-4 rounded-full w-full"
                onClick={onApplyHandler}
              >
                Apply
              </button>
            ) : null}
          </span>

          <button
            type="button"
            className="bg-blue-600 text-white py-2 px-4 w-full rounded-full"
            onClick={onOpenModal}
          >
            New File
          </button>
        </div>

        <SyntaxHighlighter
          className="col-span-1 sm:col-span-4 max-h-screen"
          language="javascript"
          style={docco}
          showLineNumbers
          showInlineLineNumbers
        >
          {fileContent}
        </SyntaxHighlighter>
        <SyntaxHighlighter
          className="col-span-1 sm:col-span-4 max-h-screen"
          language="javascript"
          style={docco}
          showLineNumbers
          showInlineLineNumbers
        >
          {cleanedFileContent}
        </SyntaxHighlighter>
      </div>
      {/* MODEL BEGINS */}
      <Modal
        open={open}
        onClose={onCloseModal}
        closeOnOverlayClick={false}
        closeOnEsc={false}
        showCloseIcon={false}
        center
        styles={{
          overlay: { backgroundColor: "grey" },
          modal: { borderRadius: "10px" },
        }}
      >
        <DragDropModel callbackFunction={availableFeatures} />
      </Modal>
      {/* MODEL ENDS */}

      <FloatingButton />
    </div>
  );
}

export default FileUpload;
