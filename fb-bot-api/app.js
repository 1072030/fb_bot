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
    const allComments = await PublicRead(doc.data().post_id);
    let comments = doc.data().comment_id;
    //console.log(doc.data().comment_id);
    allComments.map(async (x) => {
      if (doc.data().comment_id.indexOf(x.id) == -1) {
        //不存在於firebase需要回復
        console.log("---------原始對話: ", x.message);
        const content = messageAnalyze(x.message);
        const publicReply = await PublicReply(
          x.id,
          "小編已私訊您~請查看留言唷"
        ); //測試成功
        const order = orderPrice(content, x.message);
        const secretReply = await SecretReply(x.id, order); //只能回復管理員 需要權限...
        comments.push(x.id);
      } else {
        // console.log("沒有新留言");
      }
      await firestore.collection("object-post").doc(doc.id).update({
        comment_id: comments,
      });
    });
  });
}, 5000);
