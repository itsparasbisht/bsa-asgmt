const router = require("express").Router();
const parameters = ["CO2", "NO2", "SO2"];
const validator = require("validator");

router.post("/", (req, res) => {
  try {
    const { country, year, value, parameter } = req.body;
    console.log(country, year, value, parameter);

    if (country && year && value && parameter) {
      const isFloat = validator.isFloat(value);
      console.log(isFloat);
      res.json({ message: "ghg-emissions route" });
    } else {
      throw new Error(
        JSON.stringify({
          message: "missing body parameters",
          required: ["country", "year", "value", "parameter"],
        })
      );
    }
  } catch (error) {
    res.status(404).json(JSON.parse(error.message));
  }
});

module.exports = router;
