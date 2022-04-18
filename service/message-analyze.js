const messageAnalyze = (message) => {
  let label = [];
  let content = [];
  let location;
  label = message.split("、"); //
  const len = label.length;
  location = label[len - 1].split("，"); //取出地點
  label = label.slice(0, len - 1); //去除最後一個(包含地點)
  label.push(location[0]); //將最後一個加回去
  location = location[1]; //地點是陣列第二個
  label.map((x) => {
    //每個品項用+號分開
    content.push(x.split("+"));
  });
  return { content, location };
};
module.exports = { messageAnalyze };
