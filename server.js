const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

//db
mongoose
  .connect(process.env.DATABASE, {})
  .then(() => console.log("DB connected"))
  .catch((err) => console.log("DB Error => ", err));

const app = express();

//import routes

const authRoutes = require("./routes/auth");

//app  middlewares

app.use(morgan("dev"));
app.use(bodyParser.json());
//app.use(cors());
app.use(cors({ origin: process.env.CLIENT_URL }));

//middlewares

app.use("/api", authRoutes);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`api is running on port ${8000}`);
});
