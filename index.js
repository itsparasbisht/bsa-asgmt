const express = require("express");
const app = express();
const PORT = 5000 || process.env.PORT;
const dbConnect = require("./db/dbConnect");

dbConnect();
app.use(express.json());

// app routes ---------------
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
