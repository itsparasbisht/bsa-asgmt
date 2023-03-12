const redis = require("redis");
require("dotenv").config();
const redisUri = process.env.REDIS_URI;

const redisClient = redis.createClient({
  url: redisUri,
});
redisClient.connect();
redisClient.on("ready", () => {
  console.log("Connected to redis...");
});
redisClient.on("error", (error) => {
  console.error(error);
});

module.exports = redisClient;
