const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const verify_webhook = require("./router/verify-webhook");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.options(
  cors({
    origin: "*",
  })
);
app.use("/", verify_webhook);
app.get("/", (req, res) => {
  res.status(200).send("health");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
