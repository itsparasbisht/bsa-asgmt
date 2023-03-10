const express = require("express");
const app = express();
const PORT = 5000 || process.env.PORT;

// routes ---------------
const ghgEmissionsRoute = require("./routes/ghg-emissions");

app.get("/", (_, res) => {
  res.json({
    message: "base route of the application",
  });
});

app.use(express.json());
app.use("/ghg-emissions", ghgEmissionsRoute);

app.listen(5000, () => {
  console.log(`Listening on port ${PORT}...`);
});
