const express = require("express");
const app = express();
var cors = require("cors");
const cookiesParser = require('cookie-parser');
const mongoose = require('mongoose');
const port = 8080;
const db_link = "mongodb+srv://gopalsays:GopalHarshitGrishav%40147@cluster0.pi3dc.mongodb.net/GingerPen?retryWrites=true&w=majority"



let server = app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});

const io = require('socket.io')(server, {
  cors: {
    "Access-Control-Allow-Origin": '*',
  }
});
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookiesParser());

const authRouter = require("./routers/authRouter");
const homeRouter = require("./routers/homeRouter");
const codeRouter = require("./routers/codeRouter");

app.use(cors({
  origin: "*"
}))
app.use('/code', codeRouter);
app.use('/auth', authRouter);
app.use('/', homeRouter);

mongoose.connect(db_link)
  .then(function (db) {
    console.log("Connected to DB")
  })
  .catch(function (err) {
    console.log(`Error connecting to DB: ${err.message}`);
  });



const sessiontracker = [];

io.on('connection', (socket) => {
  console.log(`new connection ${socket.id}`);
  socket.on("sup", (sessionid) => {
  })

  socket.on('typed', function (data) {
    // console.log(data);
    io.sockets.emit('typed', { data: data.code, lang: data.lang, sessionid: data.sessionid });

  })
})
