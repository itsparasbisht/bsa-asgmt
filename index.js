const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT;
const dbConnect = require("./db/dbConnect");
const ghgEmissionsRoute = require("./routes/ghg-emissions");

dbConnect();
app.use(express.json());

// app routes ---------------
app.get("/", (_, res) => {
  res.json({
    message: "base route of the application",
  });
});

app.use("/ghg-emissions", ghgEmissionsRoute);

app.listen(5000, () => {
  console.log(`Listening on port ${PORT}...`);
});
