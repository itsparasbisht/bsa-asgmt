const router = require("express").Router();

router.get("/", (req, res) => {
  res.json({ message: "ghg-emissions route" });
});

module.exports = router;
