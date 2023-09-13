const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.use(require("../routes/FileRoutes"));
app.use(require("../routes/ValidationRoutes"));

app.listen(PORT, () => {
  console.log("Server running on PORT : " + PORT);
});
