var fs = require("fs");
const FILE_DIRECTORY = process.env.FILE_DIRECTORY;
const putout = require("putout");

const validateEmptyLines = () => {
  let isEmptyLineFound = false;

  const data = fs.readFileSync(FILE_DIRECTORY, { encoding: "utf8" });
  let dataArray = data.split("\n");

  const fn = async () => {
    let promise = new Promise((resolve, reject) => {
      dataArray.some((line, index) => {
        if (line === "\r") {
          isEmptyLineFound = true;
          return true;
        }
      });
      resolve();
    });

    await promise;
  };

  fn();

  return isEmptyLineFound;
};

const validateUnusedVariables = () => {
  let isUnusedVariableFound = false;

  const source = fs.readFileSync(FILE_DIRECTORY, { encoding: "utf8" });

  const output = putout(source, {
    fix: false,
    plugins: ["remove-unused-variables"],
  });

  if (output.places.length > 0) {
    isUnusedVariableFound = true;
  }
  return isUnusedVariableFound;
};

const validateEmptyMethods = () => {
  let isEmptyMethodsFound = false;

  const data = fs.readFileSync(FILE_DIRECTORY, { encoding: "utf8" });

  let dataArray = data.split("\n");

  const regexChecker = /\{\}/i;

  const fn = async () => {
    let promise = new Promise((resolve, reject) => {
      dataArray.some((line, index) => {
        if (regexChecker.test(line)) {
          isEmptyMethodsFound = true;
          return true;
        }
      });
      resolve();
    });

    await promise;
  };

  fn();

  return isEmptyMethodsFound;
};

const validateUnreachableCode = () => {
  let isUreachableCodeFound = false;

  const source = fs.readFileSync(FILE_DIRECTORY, { encoding: "utf8" });

  const output = putout(source, {
    fix: false,
    plugins: ["remove-unreachable-code"],
  });

  if (output.places.length > 0) {
    isUreachableCodeFound = true;
  }
  return isUreachableCodeFound;
};

const validateComments = () => {
  let isCommentFound = false;

  const data = fs.readFileSync(FILE_DIRECTORY, { encoding: "utf8" });

  let dataArray = data.split("\n");

  const regexChecker = /\/\//i;

  const fn = async () => {
    let promise = new Promise((resolve, reject) => {
      dataArray.some((line, index) => {
        if (regexChecker.test(line)) {
          isCommentFound = true;
          return true;
        }
      });
      resolve();
    });

    await promise;
  };

  fn();

  return isCommentFound;
};

const validationController = (req, res) => {
  let isEmptyMethodsFound = validateEmptyMethods();
  let isEmptyLineFound = validateEmptyLines();
  let isUnusedVariableFound = validateUnusedVariables();
  let isUreachableCodeFound = validateUnreachableCode();
  let isCommentFound = validateComments();

  return res.status(200).json({
    response: [
      { isValid: isEmptyLineFound, text: "Empty Lines" },
      { isValid: isUnusedVariableFound, text: "Unused Variables/Methods" },
      { isValid: isEmptyMethodsFound, text: "Emtpy Methods" },
      { isValid: isUreachableCodeFound, text: "Unreachable Code" },
      { isValid: isCommentFound, text: "Comments" },
    ],
  });
};

module.exports = {
  validationController,
};
