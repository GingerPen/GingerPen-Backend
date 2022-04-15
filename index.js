const express = require("express");

const app = express();
var cors = require("cors");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});

app.get("/", (req, res) => {
  res.json({ status: "sup" });
});

app.post("/runCode", (req, res) => {
  const some = req.body;

  res.json({ language: `${some.language}`, code: `${some.code}` });
});
