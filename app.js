const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const verify_webhook = require("./router/verify-webhook");
const {
  replyMessager,
  PublicSearch,
  PublicRead,
  PublicReply,
  SecretReply,
} = require("./service/messager-bot");
const { firestore } = require("./config/firestore");
const { messageAnalyze } = require("./service/message-analyze");
const { orderPrice } = require("./service/order-price");
const {
  getGroupsRead,
  getGroupsMessages,
  groupsMessagesPublicReply,
  groupsMessagesUrlGenerate,
} = require("./service/group-message-reply");

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
setInterval(async () => {
  const allPostContent = await firestore.collection("object-post").get();
  allPostContent.forEach(async (doc) => {
    const allPost = await getGroupsRead();
    allPost.map(async (x) => {
      if (x.id === doc.data().post_id) {
        let comments = doc.data().comment_id;
        const allComments = await getGroupsMessages(x.id); //取得留言
        allComments.map(async (y) => {
          if (comments.indexOf(y.id) == -1) {
            //不存在於資料庫中 => 新留言
            comments.push(y.id);
            // const contentReply = groupsMessagesUrlGenerate(y.message);
            const contentReply = "Get message every ten second";
            const publicReply = await groupsMessagesPublicReply(
              y.id,
              contentReply
            );
            const update = await firestore //新留言記錄在資料庫
              .collection("object-post")
              .doc(doc.id)
              .update({
                //update問題 陣列越多 更新次數按照數量而定(firestore 免費2萬次)
                comment_id: comments,
              });
          }
        });
      }
    });
  });
}, 5000);
// setInterval(async () => {
//   try {
//     console.log("interval");
//     const allPostContent = await firestore.collection("object-post").get();
//     allPostContent.forEach(async (doc) => {
//       const allComments = await PublicRead(doc.data().post_id);
//       let comments = doc.data().comment_id;
//       //console.log(doc.data().comment_id);
//       allComments.map(async (x) => {
//         if (doc.data().comment_id.indexOf(x.id) == -1) {
//           //不存在於firebase需要回復
//           console.log("---------原始對話: ", x.message);
//           const content = messageAnalyze(x.message);
//           const publicReply = await PublicReply(
//             x.id,
//             "小編已私訊您~請查看留言唷"
//           ); //測試成功
//           const order = orderPrice(content, x.message);
//           const secretReply = await SecretReply(x.id, order); //只能回復管理員 需要權限...
//           comments.push(x.id);
//         } else {
//           // console.log("沒有新留言");
//         }
//         await firestore.collection("object-post").doc(doc.id).update({
//           comment_id: comments,
//         });
//       });
//     });
//   } catch (err) {
//     console.log(err);
//   }
// }, 5000);
