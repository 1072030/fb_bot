const express = require("express");
const router = express.Router();
const { replyMessager } = require("../service/messager-bot-reply");
require("dotenv").config();
router.get("/webhook", (req, res) => {
  let VERIFY_TOKEN = process.env.VERIFY_TOKEN;
  let mode = req.query["hub.mode"];
  let token = req.query["hub.verify_token"];
  let challenge = req.query["hub.challenge"];
  if (mode && token) {
    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      console.log("WEBHOOK_VERIFIED");
      res.status(200).send(challenge);
    } else {
      res.sendStatus(403);
    }
  }
});
router.post("/webhook", async (req, res) => {
  let body = req.body;
  console.log("body", body);
  if (body.object === "page") {
    body.entry.forEach(function (entry) {
      let webhook_event = entry.messaging[0];
      //webhook_event : sender(發送) recipient(獲得)
      const data = replyMessager({
        message_type: "text",
        recipient: {
          id: webhook_event.recipient,
        },
        message: {
          text: "hello world",
        },
      });
      Promise.all(data);
      console.log(webhook_event);
    });
    res.status(200).send("EVENT_RECEIVED");
  } else {
    res.sendStatus(404);
  }
});
module.exports = router;
