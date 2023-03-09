const express = require("express");
const app = express();
const PORT = 5000 || process.env.PORT;

app.get("/", (req, res) => {
  res.json({
    message: "base route of the application",
  });
});

app.listen(5000, () => {
  console.log(`Listening on port ${PORT}...`);
});
