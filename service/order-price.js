// const orderPrice = (message, originMessage) => {
//   let replyMessage = "";
//   console.log(message.content);
//   if (message.location === undefined || message.location === "") {
//     replyMessage = `你的貼文留言: "${originMessage}" \n填寫內容有誤，請重新填寫，可查看貼文上的留言格式。\n感謝您的配合，造成您的不便敬請見諒。`;
//     console.log(replyMessage);
//     return replyMessage;
//   } else {
//     let order;
//     let orderPrice = 0;
//     let orderCode = "";
//     for (let i = 0; i < 6; i++) {
//       orderCode += Math.floor(Math.random() * 10);
//     }
//     orderCode = new Date().getTime() + orderCode;
//     order = message.content.map((x) => {
//       const name = x[0].trim();
//       switch (name) {
//         case "青江菜":
//           orderPrice += 65 * parseInt(x[1]);
//           break;
//         case "超嫩水耕A菜":
//           orderPrice += 60 * parseInt(x[1]);
//           break;
//         case "高山四季豆":
//           orderPrice += 85 * parseInt(x[1]);
//           break;
//         case "新鮮玉米筍":
//           orderPrice += 89 * parseInt(x[1]);
//           break;
//         case "鮮厚香菇":
//           orderPrice += 50 * parseInt(x[1]);
//           break;
//         case "特選鮮甜筊白筍":
//           orderPrice += 140 * parseInt(x[1]);
//           break;
//         case "特選杏包菇":
//           orderPrice += 80 * parseInt(x[1]);
//           break;
//         case "金針菇":
//           orderPrice += 37 * parseInt(x[1]);
//           break;
//         case "鮮嫩蘆筍":
//           orderPrice += 99 * parseInt(x[1]);
//           break;
//         case "鄭美香開心果":
//           orderPrice += 299 * parseInt(x[1]);
//           break;
//         case "海底撈清油鍋底":
//           orderPrice += 80 * parseInt(x[1]);
//           break;
//         case "海底撈番茄鍋底":
//           orderPrice += 80 * parseInt(x[1]);
//           break;
//         case "海底撈三鮮鍋底":
//           orderPrice += 80 * parseInt(x[1]);
//           break;
//       }
//       return name + x[1] + "份";
//     });
//     replyMessage = `訂單編號: ${orderCode}\n品項: ${order}\n價格: ${orderPrice}元\n地點: ${
//       message.location
//     }\n運費: 60元\n總金額: ${orderPrice + 60}元\n到貨日期: ${Math.floor(
//       Math.random() * 3 + +2
//     )}天後。\n如果有任何需求在私訊小編唷，小編會盡快與您聯繫 :)`;
//     return replyMessage;
//   }
// };
// module.exports = { orderPrice };
