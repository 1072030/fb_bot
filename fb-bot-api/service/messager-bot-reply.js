const axios = require("axios");
const replyMessager = async (body) => {
  //   const data = await fetch(
  //     `https://graph.facebook.com/v2.6/me/messages?access_token=${process.env.ACCESS_TOKEN}`,
  //     {
  //       method: "POST",
  //       body: JSON.stringify(body),
  //       header: {
  //         "Content-Type": "application/json",
  //       },
  //     }
  //   )
  //     .then((res) => {
  //       return res.json();
  //     })
  //     .then((result) => {
  //       console.log(result);
  //     });
  //   return data;
  const data = await axios({
    method: "POST",
    url: `https://graph.facebook.com/v2.6/me/messages?access_token=${process.env.ACCESS_TOKEN}`,
    data: body,
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    console.log(res);
  });
};

module.exports = { replyMessager };
