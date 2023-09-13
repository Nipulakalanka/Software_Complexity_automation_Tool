var multer = require("multer");
var fs = require("fs");
const putout = require("putout");

const FILE_DIRECTORY = process.env.FILE_DIRECTORY;

// MULTER CONFIGURATION STARTS

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "data");
  },
  filename: function (req, file, cb) {
    cb(null, "data.js");
  },
});

var upload = multer({ storage: storage }).single("file");

// MULTER CONFIGURATION ENDS

const getFileFromClient = (req, res) => {
  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      console.log(err);
      return res.status(422).json({ message: "Something went wrong" });
    } else if (err) {
      console.log(err);
      return res.status(422).json({ message: "Something went wrong" });
    }
    return res.status(200).json({ message: "Successfully uploaded the file" });
  });
};

const removeEmptyLines = (req, res) => {
  fs.readFile(FILE_DIRECTORY, { encoding: "utf-8" }, function (err, data) {
    if (err) {
      console.log(err);
      throw err;
    }

    let dataArray = data.split("\n");
    console.log("converting file data in an array", dataArray);

    let dataArrayNew = dataArray.filter((a) => a !== "\r");
    console.log("removing empty lines");

    const updatedData = dataArrayNew.join("\n");
    console.log("converting array back to string", updatedData);

    fs.writeFile(FILE_DIRECTORY, updatedData, (err) => {
      if (err) throw err;
      console.log("Successfully updated the file data");
      return res.status(200).send("OK");
    });
  });
};

const removeUnusedVariables = (req, res) => {
  fs.readFile(FILE_DIRECTORY, "utf8", (err, source) => {
    if (err) throw err;

    const output = putout(source, {
      plugins: ["remove-unused-variables"],
    });

    fs.writeFile(FILE_DIRECTORY, output.code, (err) => {
      if (err) throw err;
      console.log("Successfully updated the file data");
      return res.status(200).send("OK");
    });
  });
};

const removeEmptyMethods = (req, res) => {
  fs.readFile(FILE_DIRECTORY, { encoding: "utf-8" }, function (err, data) {
    if (err) {
      console.log(err);
      throw err;
    }

    let dataArray = data.split("\n");

    const regexChecker = /\{\}/i;

    let dataArrayNew = dataArray.filter((line) => !regexChecker.test(line));

    const updatedData = dataArrayNew.join("\n");

    fs.writeFile(FILE_DIRECTORY, updatedData, (err) => {
      if (err) throw err;
      console.log("Successfully updated the file data");
      return res.status(200).send("OK");
    });
  });
};

const removeUnreachableCode = (req, res) => {
  fs.readFile(FILE_DIRECTORY, "utf8", (err, source) => {
    if (err) throw err;

    const output = putout(source, {
      plugins: ["remove-unreachable-code"],
    });

    fs.writeFile(FILE_DIRECTORY, output.code, (err) => {
      if (err) throw err;
      console.log("Successfully updated the file data");
      return res.status(200).send("OK");
    });
  });
};

const getCleanedFile = (req, res) => {
  res.sendFile(FILE_DIRECTORY);
};

const downloadFile = (req, res) => {
  res.download(FILE_DIRECTORY);
};

module.exports = {
  getFileFromClient,
  removeEmptyLines,
  getCleanedFile,
  removeUnusedVariables,
  downloadFile,
  removeEmptyMethods,
  removeUnreachableCode,
};
