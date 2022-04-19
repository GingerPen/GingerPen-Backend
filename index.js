const express = require("express");
const app = express();
var cors = require("cors");
const { generateFile } = require("./generateFile");
const {execute} = require("./execute");

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

app.post("/runCode", async (req, res) => {
  const { language = "java",code} = req.body;

  if(code === ""){
    return res.status(400).json({success: false, error:"Empty code body"});
  }

  //Now we need to run the file and return  output
    const filePath = await generateFile(language,code);
    console.log(filePath);
    const output =  await execute(filePath);
    console.log(`Filepath: ${filePath} and outpur is ${output}`);

  res.json({ language: `${language}`, code: `${code}` });
});
