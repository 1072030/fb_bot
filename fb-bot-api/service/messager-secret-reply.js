const axios = require("axios");
require("dotenv").config();
//這個function是私訊貼文下方留言的顧客
const SecretReply = async (commitId, message) => {
  const data = await axios({
    method: "post",
    url: `https://graph.facebook.com/v12.0/me/messages?access_token=${process.env.ACCESS_TOKEN}`,
    data: {
      message_type: "text",
      recipient: {
        comment_id: commitId,
      },
      message: {
        text: message,
      },
    },
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      console.log("successful secret reply");
    })
    .catch((err) => {
      console.log(err);
    });
  return data;
};
module.exports = { SecretReply };
