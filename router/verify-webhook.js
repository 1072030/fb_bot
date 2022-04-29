const express = require("express");
const { handleText } = require("../handleEvent/handleText");
const {
  replyMessager,
  PublicSearch,
  PublicRead,
  PublicReply,
  SecretReply,
  PublicReadSearch,
} = require("../service/messager-bot");
const { firestore } = require("../config/firestore");
const { messageAnalyze } = require("../service/message-analyze");
const { orderPrice } = require("../service/order-price");
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
/*
 *
 @param req.body.entry[0].changes
 */
// [
//   {
//     "entry": [
//       {
//         "changes": [
//           {
//             "field": "feed",
//             "value": {
//               "from": {
//                 "id": "{user-id}",
//                 "name": "Cinderella Hoover"
//               },
//               "item": "post",
//               "post_id": "{page-post-id}",
//               "verb": "add",
//               "created_time": 1520544814,
//               "is_hidden": false,
//               "message": "It's Thursday and I want to eat cake."
//             }
//           }
//         ],
//         "id": "{page-id}",
//         "time": 1520544816
//       }
//     ],
//     "object": "page"
//   }
// ]
router.post("/webhook", async (req, res) => {
  console.log("body", req.body);
  if (req.body.objcet === "page") {
    console.log(31, req.body.entry[0].changes);
    console.log(32, req.body.entry[0].changes[0].value.from);
    const entryId = req.body.entry[0].id;
    switch (entryId) {
      case "101090595820826":
        try {
          const { postId, message } = req.body.entry[0].changes[0].value;
          PublicReadSearch(postId, message);
        } catch (e) {
          console.log(e);
        }
        break;
      case "101055592406144":
        console.log("波頭君");
        break;
    }
  }
  // console.log("message", body.entry[0].messaging[0]);
  // if (
  //   body.object === "page" &&
  //   body.entry[0].messaging[0].message !== undefined
  // ) {
  //   //message 不為空 = 使用者有傳訊息
  //   for (let i = 0; i < body.entry.length; i++) {
  //     let webhook_event = body.entry[i].messaging[0];
  //     if (webhook_event.message.text !== undefined) {
  //       // await handleText(webhook_event, webhook_event.message.text); //處理文字訊息
  //       console.log("message");
  //     } else {
  //       console.log("attachments type");
  //     }
  //     console.log("webhook event", webhook_event);
  //   }
  // } else {
  //   //res.sendStatus(404);
  // }
  res.status(200).send({
    message: "success",
  });
});
// router.post("/refreshPage", async (req, res) => {
//const AllPost = await PublicSearch(); //取得fb 粉專貼文ID
// setInterval(async () => {
//   const allPostContent = await firestore.collection("object-post").get();
//   allPostContent.forEach(async (doc) => {
//     const allComments = await PublicRead(doc.data().post_id);
//     let comments = doc.data().comment_id;
//     //console.log(doc.data().comment_id);
//     allComments.map(async (x) => {
//       if (doc.data().comment_id.indexOf(x.id) == -1) {
//         //不存在於firebase需要回復
//         console.log("---------原始對話: ", x.message);
//         const content = messageAnalyze(x.message);
//         const publicReply = await PublicReply(
//           x.id,
//           "小編已私訊您~請查看留言唷"
//         ); //測試成功
//         const order = orderPrice(content, x.message);
//         const secretReply = await SecretReply(x.id, order); //只能回復管理員 需要權限...
//         comments.push(x.id);
//       } else {
//         // console.log("沒有新留言");
//       }
//       await firestore.collection("object-post").doc(doc.id).update({
//         comment_id: comments,
//       });
//     });
//   });
// }, 5000);

// res.status(200).send({
//   message: "success",
// });
// });
module.exports = router;
