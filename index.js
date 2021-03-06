const express = require("express");

const app = express();

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});

app.get("/", (req, res) => {
  res.json({ status: "running" });
});
