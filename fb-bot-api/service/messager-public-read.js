const axios = require("axios");
require("dotenv").config();
//這個function是搜尋貼文下的留言
const PublicRead = async (commitId) => {
  const data = await axios({
    method: "get",
    url: `https://graph.facebook.com/${commitId}/comments?order=reverse_chronological`,
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      console.log("All_reply", res);
    })
    .catch((err) => {
      console.log(err);
    });
  return data;
};
module.exports = { PublicRead };
