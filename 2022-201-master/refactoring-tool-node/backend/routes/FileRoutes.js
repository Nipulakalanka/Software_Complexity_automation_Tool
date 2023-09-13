const express = require("express");
const router = express.Router();
const {
  getFileFromClient,
  removeEmptyLines,
  getCleanedFile,
  removeUnusedVariables,
  downloadFile,
  removeEmptyMethods,
  removeUnreachableCode,
} = require("../controllers/FileController");

// routes for file operations BEGIN
router.post("/upload", getFileFromClient);
router.get("/download", downloadFile);
router.get("/getCleanedFile", getCleanedFile);
// routes for file operations END

// routes for refactoring operations BEGIN
router.get("/removeEmptyLines", removeEmptyLines);
router.get("/removeUnusedVariables", removeUnusedVariables);
router.get("/removeEmptyMethods", removeEmptyMethods);
router.get("/removeUnreachableCode", removeUnreachableCode);
// routes for refactoring operations END

module.exports = router;
