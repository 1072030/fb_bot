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
  uri = "https://freshfood.ecs-liff.bots.tw/api/preOrder?";
  uri = uri.concat("items=");
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
  console.log(uri);
  return uri;
  // if (obj.length !== 0) {
  //   let content = '下單成功 !\n';
  //   for (let i = 0; i < obj.length; i++) {
  //     if (i == obj.length - 1) {
  //       content = content.concat(
  //         `品項:${obj[i].item}，數量:${obj[i].quantity}個。`,
  //       );
  //     } else {
  //       content = content.concat(
  //         `品項:${obj[i].item}，數量:${obj[i].quantity}個\n`,
  //       );
  //     }
  //   }
  //   return content;
  // } else {
  //   return 'cannot get your message ! Please try again';
  // }
};
module.exports = { messageAnalyze, groupsMessagesUrlGenerate };
