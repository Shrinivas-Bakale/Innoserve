const admin = require("firebase-admin");
const serviceAccount = require("./permissions.json"); // No need for `assert { type: "json" }` in CommonJS

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://capstone-ea1a9-default-rtdb.firebaseio.com/",
});

const db = admin.firestore();

module.exports = { db };
