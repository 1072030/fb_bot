const express = require("express");
const app = express();
const verify_webhook = require("./router/verify_webhook");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/", verify_webhook);
app.get("/", (req, res) => {
  res.status(200).send("health");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
