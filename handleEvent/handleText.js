const { messageAnalyze } = require("../service/message-analyze");
const { replyMessager } = require("../service/messager-bot");
const handleText = async (webhook_event, text) => {
  //console.log(text); //這裡可以回傳對應內容
  const content = messageAnalyze(text);
  // console.log("content----------------", content);
  const fruitList = content.content.map((x) => {
    return x[0] + x[1] + "個";
  });
  console.log("fruitlist", fruitList);
  if (content.content === undefined || content.location === undefined) {
    const data = await replyMessager({
      message_type: "text",
      recipient: {
        id: webhook_event.sender.id,
      },
      message: {
        text: `不確定您的訂單項目，請檢查格式是否錯誤。\n範例 : 芭樂+1、蓮霧+1、香蕉+1，市場取`,
      },
    });
  } else {
    const data = await replyMessager({
      message_type: "text",
      recipient: {
        id: webhook_event.sender.id,
      },
      message: {
        text: `品項 : ${fruitList}\n地區 : ${content.location}`,
      },
    });
  }
};
module.exports = { handleText };
