const fs = require("fs");
const crypto = require("crypto");

const secretKey = crypto.randomBytes(32).toString("hex");

console.log("Generated secret key:", secretKey);

fs.writeFileSync("secretKey.txt", secretKey, "utf-8");

console.log("Secret key generated and saved");

module.exports = {
  jwtSecret: secretKey,
};
