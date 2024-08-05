const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");

const managerRoute = require("./routes/manager.route");
const employeeRoute = require("./routes/employee.route");
const divisionRoute = require("./routes/division.route")
const assetRoute = require("./routes/asset.route");

dotenv.config();

const corsOptions = {
  origin: "http://localhost:5173", // Allow only this origin
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204
};


const port = process.env.PORT || 8000;
const app = express();

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

app.use("/manager", managerRoute);
app.use("/employee", employeeRoute);
app.use("/division", divisionRoute);
app.use("/assets", assetRoute);

app.listen(port, () => {
  console.log(`Running on port ${port}!`);
});
