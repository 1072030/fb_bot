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
const groupsMessagesUrlGenerate = (message) => {
  //利用換行
  //利用井號 #
  //利用ABC
  //利用+1來分割
  let obj = [];
  let uri = "";
  let contentArr;
  if (message.includes("，")) {
    contentArr = message.split("，");
  } else if (message.includes("\n")) {
    contentArr = message.split("\n");
  }
  contentArr.map((x) => {
    const goods = x.split("+");
    for (let i = 0; i < goods.length; i++) {
      goods[i] = goods[i].replace(/\r\n|\n/g, "");
      goods[i] = goods[i].replace(/\s+/g, "");
    }
    const item = goods[0];
    const quantity = goods[1];
    if (item !== undefined && quantity !== undefined) {
      obj.push({
        item,
        quantity,
      });
    }
  });
  if (obj.length !== 0) {
    let content = "商品內容:\n";
    for (let i = 0; i < obj.length; i++) {
      if (i == obj.length - 1) {
        content = content.concat(
          `品項:${obj[i].item}，數量:${obj[i].quantity}個。`
        );
      } else {
        content = content.concat(
          `品項:${obj[i].item}，數量:${obj[i].quantity}個\n`
        );
      }
    }
    return content;
  } else {
    return "cannot get your message ! Please try again";
  }
};

module.exports = {
  getGroupsRead,
  getGroupsMessages,
  groupsMessagesPublicReply,
  groupsMessagesUrlGenerate,
};
