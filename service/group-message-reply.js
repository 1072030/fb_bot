const axios = require("axios");
require("dotenv").config();
const getGroupsRead = async () => {
  //社團貼文搜尋
  const data = await axios({
    method: "get",
    url: `https://graph.facebook.com/v13.0/${process.env.GROUP_ID}/feed?access_token=${process.env.ACCESS_TOKEN}`,
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      return res.data.data;
    })
    .catch((err) => {
      console.log(err);
    });
  return data;
};
const getGroupsMessages = async (groupPostId) => {
  const data = await axios({
    method: "get",
    url: `https://graph.facebook.com/v13.0/${groupPostId}/comments?access_token=${process.env.ACCESS_TOKEN}`,
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      return res.data.data;
    })
    .catch((err) => {
      console.log(err);
    });
  return data;
};
const groupsMessagesPublicReply = async (commitId, message) => {
  const data = await axios({
    method: "post",
    url: `https://graph.facebook.com/v13.0/${commitId}/comments?access_token=${process.env.ACCESS_TOKEN}`,
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
const groupsMessagesUrlGenerate = async (message) => {
  const contentArr = message.split("\n"); // 標示
  let uri = "";
  contentArr.map((x) => {
    console.log(59, x);
  });
  return 0;
};
module.exports = {
  getGroupsRead,
  getGroupsMessages,
  groupsMessagesPublicReply,
  groupsMessagesUrlGenerate,
};
