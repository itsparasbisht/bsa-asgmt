const router = require("express").Router();
const { body, query, validationResult } = require("express-validator");
const GhgEmission = require("../model/ghg-emissions");

function validatePostData() {
  return [
    body("country").isString().toLowerCase(),
    body("year").isString(),
    body("value").isFloat(),
    body("parameter").isIn(["CO2", "NO2", "SO2"]),
  ];
}

function validateGetData() {
  return [
    query("start_year").isString(),
    query("end_year").isString(),
    query("country_name").isString().toLowerCase(),
  ];
}

router.post("/", validatePostData(), async (req, res) => {
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

router.get("/", validateGetData(), async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { start_year, end_year, parameter, country_name } = req.query;
    const allGhgEmissions = await GhgEmission.find({
      year: { $gte: start_year, $lte: end_year },
      country: country_name,
      ...(parameter ? { parameter } : {}),
    });
    return res.status(200).json(allGhgEmissions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
