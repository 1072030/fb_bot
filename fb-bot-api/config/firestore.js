const serviceAccount = require("./fb-messager-dedc7-firebase-adminsdk-ylcc8-dff3b68aee.json");
const admin = require("firebase-admin");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:
    "https://fb-messager-dedc7-default-rtdb.asia-southeast1.firebasedatabase.app/",
});
const firestore = admin.firestore();
module.exports = { firestore };
