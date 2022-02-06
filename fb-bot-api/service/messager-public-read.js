const axios = require("axios");
require("dotenv").config();
//這個function是搜尋貼文下的留言
const PublicRead = async (commitId) => {
  const data = await axios({
    method: "get",
    url: `https://graph.facebook.com/v12.0/${commitId}/comments?order=reverse_chronological&filter=toplevel&access_token=${process.env.ACCESS_TOKEN}`,
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      //console.log("All_reply", res.data.data);
      return res.data.data;
    })
    .catch((err) => {
      console.log(err);
    });
  return data;
};
module.exports = { PublicRead };
