const { replyMessager } = require("../service/messager-bot-reply");
const handleText = async (text) => {
  console.log(text); //這裡可以回傳對應內容
  const data = await replyMessager({
    message_type: "text",
    recipient: {
      id: webhook_event.sender.id,
    },
    message: {
      text: "hello world",
    },
  });
};
module.exports = { handleText };
