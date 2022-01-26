const axios = require("axios");

require("dotenv").config();
//webhook回應
const replyMessager = async (body) => {
  const data = await axios({
    method: "post",
    url: `https://graph.facebook.com/v2.6/me/messages?access_token=${process.env.ACCESS_TOKEN}`,
    data: body,
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      console.log("successful send");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = { replyMessager };
