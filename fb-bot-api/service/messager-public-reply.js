const axios = require("axios");
require("dotenv").config();
//這個function回覆貼文下面的留言
const PublicReply = async (commitId, message) => {
  const data = await axios({
    method: "post",
    url: `https://graph.facebook.com/v12.0/${commitId}/comments?access_token=${process.env.ACCESS_TOKEN}`,
    data: {
      message: message,
    },
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      console.log("successful public reply");
    })
    .catch((err) => {
      console.log(err);
    });
  return data;
};
module.exports = { PublicReply };
