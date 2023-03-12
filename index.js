const express = require("express");
const app = express();
const PORT = 5000 || process.env.PORT;
const dbConnect = require("./db/dbConnect");
const redis = require("redis");
require("dotenv").config();
const redisUri = process.env.REDIS_URI;

dbConnect();
app.use(express.json());

// redis --------------
const redisClient = redis.createClient({
  url: redisUri,
});
redisClient.connect();
redisClient.on("error", (error) => {
  console.error(error);
});
redisClient.set("test", "hello");

// routes ---------------
const ghgEmissionsRoute = require("./routes/ghg-emissions");

app.get("/", (_, res) => {
  res.json({
    message: "base route of the application",
  });
});

app.use("/ghg-emissions", ghgEmissionsRoute);

app.listen(5000, () => {
  console.log(`Listening on port ${PORT}...`);
});
