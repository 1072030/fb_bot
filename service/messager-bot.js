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
    url: `https://graph.facebook.com/v12.0/${post_id}/comments?summary=1&filter=toplevel&order=chronological&access_token=${process.env.ACCESS_TOKEN}`,
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      //console.log("All_reply", res.data.data);
      return res;
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
    url: `https://graph.facebook.com/v13.0/me/messages?access_token=${process.env.ACCESS_TOKEN}`,
    data: {
      recipient: {
        comment_id: commitId,
      },
      message: {
        attachment: {
          type: "template",
          payload: {
            template_type: "button",
            text: `您的預購商品網址已建立，點選按鈕即可前往`,
            buttons: [
              {
                type: "web_url",
                title: "前往網站",
                url: message,
              },
            ],
          },
        },
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
const PublicPostSearch = async (post_id) => {
  const data = await axios({
    method: "get",
    url: `https://graph.facebook.com/v13.0/${post_id}?access_token=${process.env.ACCESS_TOKEN}`,
  })
    .then((res) => {
      return res.data;
    })
    .catch((e) => {
      console.log(e);
    });
  return data.message;
};
module.exports = {
  replyMessager,
  PublicSearch,
  PublicRead,
  PublicReply,
  PublicPostSearch,
  SecretReply,
};
