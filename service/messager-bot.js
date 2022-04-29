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
//這個function是搜尋貼文下的留言
const PublicRead = async (post_id) => {
  const data = await axios({
    method: "get",
    url: `https://graph.facebook.com/v12.0/${post_id}/comments?order=reverse_chronological&filter=toplevel&access_token=${process.env.ACCESS_TOKEN}`,
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
//Search commentId

//這個function回覆貼文下面的留言
const PublicReply = async (commitId, message) => {
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
module.exports = {
  replyMessager,
  PublicSearch,
  PublicRead,
  PublicReply,
  SecretReply,
};
