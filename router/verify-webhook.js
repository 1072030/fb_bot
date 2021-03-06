const express = require("express");
const { handleText } = require("../handleEvent/handleText");
const {
  replyMessager,
  PublicSearch,
  PublicRead,
  PublicReply,
  SecretReply,
  PublicPostSearch,
} = require("../service/messager-bot");
const { firestore } = require("../config/firestore");
const {
  messageAnalyze,
  MessagesUrlGenerate,
  postMessageAnalyze,
} = require("../service/message-analyze");
// const { orderPrice } = require("../service/order-price");
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
  if (req.body.object == "page") {
    try {
      const entry = req.body.entry[0];
      // console.log(31, req.body.entry[0].changes);
      // console.log(32, req.body.entry[0].changes[0].value.from);
      const entryId = req.body.entry[0].id;
      switch (entryId) {
        case "101090595820826":
          if (entry.changes !== undefined) {
            const { post_id, comment_id, parent_id, message, verb, from } =
              entry.changes[0].value;
            console.log("changes", req.body.entry[0].changes);
            console.log("from", req.body.entry[0].changes[0].value.from);
            // console.log(comment_id);
            if (post_id === parent_id && verb === "add") {
              //verb === 'add' ?????????????????????
              const publicReplyMessage = "????????????????????????????????????????????? !";
              const publicReply = await PublicReply(
                comment_id,
                `${publicReplyMessage}`
              );
              const postContent = await PublicPostSearch(post_id);

              const deliveryDate = postMessageAnalyze(postContent.message); //????????????????????????
              const secretReplyMessage = MessagesUrlGenerate(
                message,
                deliveryDate,
                comment_id
              );
              const secretReply = await SecretReply(
                comment_id,
                secretReplyMessage
              );
              Promise.all([publicReply, postContent, secretReply]);
            }
          } else if (entry.messaging !== undefined) {
            console.log("messaging", entry.messaging[0]);
          }
          break;
        case "733025400791073":
          console.log("?????????");
          break;
        case "107803017532441":
          console.log("????????????");
          break;
      }
    } catch (e) {
      console.log("???????????? : ", e);
    }
  }
  // console.log("message", body.entry[0].messaging[0]);
  // if (
  //   body.object === "page" &&
  //   body.entry[0].messaging[0].message !== undefined
  // ) {
  //   //message ????????? = ?????????????????????
  //   for (let i = 0; i < body.entry.length; i++) {
  //     let webhook_event = body.entry[i].messaging[0];
  //     if (webhook_event.message.text !== undefined) {
  //       // await handleText(webhook_event, webhook_event.message.text); //??????????????????
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
//const AllPost = await PublicSearch(); //??????fb ????????????ID
// setInterval(async () => {
//   const allPostContent = await firestore.collection("object-post").get();
//   allPostContent.forEach(async (doc) => {
//     const allComments = await PublicRead(doc.data().post_id);
//     let comments = doc.data().comment_id;
//     //console.log(doc.data().comment_id);
//     allComments.map(async (x) => {
//       if (doc.data().comment_id.indexOf(x.id) == -1) {
//         //????????????firebase????????????
//         console.log("---------????????????: ", x.message);
//         const content = messageAnalyze(x.message);
//         const publicReply = await PublicReply(
//           x.id,
//           "??????????????????~??????????????????"
//         ); //????????????
//         const order = orderPrice(content, x.message);
//         const secretReply = await SecretReply(x.id, order); //????????????????????? ????????????...
//         comments.push(x.id);
//       } else {
//         // console.log("???????????????");
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
