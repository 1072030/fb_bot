const axios = require("axios");
require("dotenv").config();
//這個function是搜尋貼文的id
const PublicRead = async () => {
  const data = await axios({
    method: "get",
    url: `https://graph.facebook.com/me/feed`,
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      console.log("Post_id", res);
      return res;
    })
    .catch((err) => {
      console.log(err);
    });
  return data;
};
module.exports = { PublicRead };
