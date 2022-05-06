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
const MessagesUrlGenerate = (
  message,
  deliveryDate,
  serialNumber,
  commentId
) => {
  //利用換行
  //利用井號 #
  //利用ABC
  //利用+1來分割
  let obj = [];
  let uri = "";
  let goodsReply = "";
  let contentArr;
  if (message.includes("，")) {
    contentArr = message.split("，");
  } else if (message.includes("\n")) {
    contentArr = message.split("\n");
  } else {
    contentArr = message.split("、");
  }
  contentArr.map((x) => {
    const goods = x.split("+");
    for (let i = 0; i < goods.length; i++) {
      goods[i] = goods[i].replace(/\r\n|\n/g, "").replace(/#/g, "");
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
  goodsReply = obj.map((x) => {
    return `品項:${x.item} 數量:${x.quantity}\n`;
  });
  goodsReply = goodsReply.replace(/,/g, "");
  console.log(goodsReply);
  uri = "http://localhost:8080/api/order/fb?";
  uri = uri.concat("item=");
  for (let i = 0; i < obj.length; i++) {
    if (i == obj.length - 1) {
      uri = uri.concat(`${obj[i].item}`);
    } else {
      uri = uri.concat(`${obj[i].item},`);
    }
  }
  uri = uri.concat("&quantity=");
  for (let i = 0; i < obj.length; i++) {
    if (i == obj.length - 1) {
      uri = uri.concat(`${obj[i].quantity}`);
    } else {
      uri = uri.concat(`${obj[i].quantity},`);
    }
  }
  uri = uri.concat(
    `&note=${serialNumber}&deliveryDate=${deliveryDate}&commentId=${commentId}`
  );

  console.log(uri);
  uri = encodeURI(uri);
  return { uri, goodsReply };
};
const postMessageAnalyze = (message) => {
  let contentArr = [];
  contentArr = message.split("取貨");
  contentArr[0] = contentArr[0].replace(/#/g, "");
  contentArr[0] = contentArr[0].split("週")[0];
  // contentArr[0] = X月 X 號
  const time = contentArr[0].split("月");
  let year;
  const month = time[0];
  const date = time[1];
  const now = new Date();
  if (now.getMonth() + 1 > month) {
    year = now.getFullYear() + 1;
  } else {
    year = now.getFullYear();
  }
  const deliveryDate = new Date(year, parseInt(month) - 1, parseInt(date));
  return deliveryDate;
};
module.exports = { messageAnalyze, MessagesUrlGenerate, postMessageAnalyze };
