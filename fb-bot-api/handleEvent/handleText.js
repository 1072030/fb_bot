const { replyMessager } = require("../service/messager-bot");
const handleText = async (webhook_event, text) => {
  console.log(text); //這裡可以回傳對應內容
  const data = await replyMessager({
    message_type: "text",
    recipient: {
      id: webhook_event.sender.id,
    },
    message: {
      text: "This is webhook reply",
    },
  });
};
module.exports = { handleText };
