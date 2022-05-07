const express = require("express");
const app = express();
const cookiesParser = require('cookie-parser');
const mongoose = require('mongoose');
const port = 8080;
const db_link = "mongodb+srv://admin:admin@cluster0.fcwvj.mongodb.net/GingerPen?retryWrites=true&w=majority"
var cors = require("cors");

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(cookiesParser());

const authRouter = require("./routers/authRouter");
const homeRouter = require("./routers/homeRouter");
const codeRouter = require("./routers/codeRouter");

app.use('/', homeRouter);
app.use('/code', codeRouter);
app.use('/auth', authRouter);



mongoose.connect(db_link)
  .then(function (db) {
    console.log("Connected to DB")
  })
  .catch(function (err) {
    console(`Error connecting to DB: ${err.message}`);
  });


// app.post("/runCode", async (req, res) => {
//   const { language = "java",code} = req.body;

//   if(code === ""){
//     return res.status(400).json({success: false, error:"Empty code body"});
//   }

//   //Now we need to run the file and return  output
//     const filePath = await generateFile(language,code);
//     const output =  await execute(filePath);
//    res.json({ output: output });
// });
