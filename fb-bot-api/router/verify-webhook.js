const express = require("express");
const { handleText } = require("../handleEvent/handleText");
const {
  replyMessager,
  PublicSearch,
  PublicRead,
  PublicReply,
  SecretReply,
} = require("../service/messager-bot");
const { firestore } = require("../config/firestore");
const { messageAnalyze } = require("../service/message-analyze");
const router = express.Router();
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
  // console.log("message", body.entry[0].messaging[0]);
  if (
    body.object === "page" &&
    body.entry[0].messaging[0].message !== undefined
  ) {
    //message 不為空 = 使用者有傳訊息
    for (let i = 0; i < body.entry.length; i++) {
      let webhook_event = body.entry[i].messaging[0];
      if (webhook_event.message.text !== undefined) {
        handleText(webhook_event, webhook_event.message.text); //處理文字訊息
      } else {
        console.log("attachments type");
      }
      console.log("webhook event", webhook_event);
    }
  } else {
    //res.sendStatus(404);
  }
  res.status(200).send({
    message: "success",
  });
});
router.post("/refreshPage", async (req, res) => {
  //const AllPost = await PublicSearch(); //取得fb 粉專貼文ID
  const allPostContent = await firestore.collection("object-post").get();
  allPostContent.forEach(async (doc) => {
    const allComments = await PublicRead(doc.data().post_id);
    let comments = doc.data().comment_id;
    //console.log(doc.data().comment_id);
    allComments.map(async (x) => {
      if (doc.data().comment_id.indexOf(x.id) == -1) {
        //不存在於firebase需要回復
        //const publicReply = await PublicReply(x.id, "這是公開的測試回復"); //測試成功
        //console.log(x.message);
        console.log(x.id);
        console.log("原始對話: ", x.message);
        const content = messageAnalyze(x.message);
        console.log(content);
        //const secretReply = await SecretReply(x.id, "這是私密的測試回復"); //只能回復管理員 需要權限...

        //comments.push(x.id);
      } else {
        //console.log("沒有新留言");
      }
    });
    await firestore.collection("object-post").doc(doc.id).update({
      comment_id: comments,
    });
  });

  res.status(200).send({
    message: "success",
  });
});
module.exports = router;
