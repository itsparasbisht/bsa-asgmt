const router = require("express").Router();
const { body, validationResult } = require("express-validator");
const GhgEmission = require("../model/ghg-emissions");

function validateAddData() {
  return [
    body("country").isString(),
    body("year").isString(),
    body("value").isFloat(),
    body("parameter").isIn(["CO2", "NO2", "SO2"]),
  ];
}

router.post("/", validateAddData(), async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const ghgEmission = new GhgEmission({ ...req.body });
    const insertedGhgEmission = await ghgEmission.save();

    return res.status(201).json(insertedGhgEmission);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
