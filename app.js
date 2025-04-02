require("dotenv").config();
const express = require("express");
const app = express();
const path = require("node:path");
const loginRouter = require("./routes/loginRouter");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use("/", loginRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Express app listening to PORT: ${PORT}`);
});
