const express = require("express");
const dotenv = require("dotenv");
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
const app = express();
const port = process.env.PORT || 8000;

app.get("/ping", (req, res) => res.status(200).send({
  message: "pong",
  env: process.env.APP_ENV,
}));

// send 404 if no other route matched
app.use((req, res) => {
  res.status(404).json({
    message: "Route Not Found",
    error: {
      message: "Route Not Found",
    },
  });
});

app.listen(port, () => {
  console.log(`Server is running on PORT ${port}`);
});

module.exports = app;
