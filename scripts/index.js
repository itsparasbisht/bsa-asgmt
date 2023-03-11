const csv = require("fast-csv");
const fs = require("fs");
const axios = require("axios");

const csvData = [];

fs.createReadStream("greenhouse_gas_inventory_data.csv")
  .pipe(csv.parse({ headers: true }))
  .on("error", (error) => console.log(error))
  .on("data", (row) => {
    const data = {
      country: row.country_or_area.toLowerCase(),
      year: row.year,
      value: row.value,
      parameter: row.parameter,
    };

    csvData.push(data);
  })
  .on("end", () => {
    csvData.forEach((item) => {
      axios
        .post("http://127.0.0.1:5000/ghg-emissions", item)
        .then(() => {
          console.log("adding...");
        })
        .catch((err) => {
          console.log(err);
          process.exit(1);
        });
    });
  });
