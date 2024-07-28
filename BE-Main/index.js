const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");

const managerRoute = require("./routes/manager.route");
const employeeRoute = require("./routes/employee.route");

dotenv.config();

const port = process.env.PORT || 8000;
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

app.use("/manager", managerRoute);
app.use("/employee", employeeRoute);

app.listen(port, () => {
  console.log(`Running on port ${port}!`);
});
