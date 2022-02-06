const axios = require("axios");
require("dotenv").config();
//這個function是搜尋貼文的id
const PublicSearch = async () => {
  const data = await axios({
    method: "get",
    url: `https://graph.facebook.com/v12.0/101090595820826/feed?access_token=${process.env.ACCESS_TOKEN}`,
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      console.log("Post_id", res.data);
    })
    .catch((err) => {
      console.log(err);
    });
  return data;
};
module.exports = { PublicSearch };
