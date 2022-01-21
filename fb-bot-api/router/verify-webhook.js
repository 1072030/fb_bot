const express = require("express");
const { handleText } = require("../handleEvent/handleText");
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
  console.log("message", body.entry[0].messaging[0]);
  if (
    body.object === "page" &&
    body.entry[0].messaging[0].message !== undefined
  ) {
    //message 不為空 = 使用者有傳訊息
    for (let i = 0; i < body.entry.length; i++) {
      let webhook_event = body.entry[i].messaging[0];
      if (webhook_event.message.text !== undefined) {
        handleText(webhook_event.message.text);
      } else {
        console.log("attachments type");
      }
      console.log("webhook event", webhook_event);
    }
    res.status(200).send("EVENT_RECEIVED");
  } else {
    res.sendStatus(404);
  }
});
module.exports = router;
