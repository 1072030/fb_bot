const axios = require("axios");
require("dotenv").config();
//這個function回覆貼文下面的留言
const PublicReply = async (commitId, message) => {
  const data = await axios({
    method: "post",
    url: `https://graph.facebook.com/${commitId}/comments`,
    body: message,
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
