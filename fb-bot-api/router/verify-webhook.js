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
    for (let i = 0; i < body.entry.length; i++) {
      let webhook_event = body.entry[i].messaging[0];
      //webhook_event : sender(發送) recipient(獲得)
      const data = await replyMessager({
        message_type: "text",
        recipient: {
          id: webhook_event.recipient,
        },
        message: {
          text: "hello world",
        },
      });
      console.log(webhook_event);
    }
    res.status(200).send("EVENT_RECEIVED");
  } else {
    res.sendStatus(404);
  }
});
module.exports = router;
