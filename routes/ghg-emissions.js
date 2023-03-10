const router = require("express").Router();
const { body, validationResult } = require("express-validator");

function validateAddData() {
  return [
    body("country").isAlpha(),
    body("year").isNumeric(),
    body("value").isFloat(),
    body("parameter").isIn(["CO2", "NO2", "SO2"]),
  ];
}

router.post("/", validateAddData(), (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    res.json({ message: "ghg-emissions route" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
