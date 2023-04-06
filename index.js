require('dotenv').config()
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const path = require('path')

const {routes} = require("./server/routes")

const PORT = process.env.PORT || 3000;
const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use(express.static(path.join(__dirname, "dist")))
routes.forEach((item) => {
  app.use(`/api/v1/${item}`, require(`./server/routes/${item}`))
})

app.use((req, res, next) => {
  res.sendFile(__dirname + '/dist/index.html');
})

async function start() {
  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(
      process.env.MONGODB_URI,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }
    );

    app.listen(PORT, () => {
      console.log(`server up ${PORT} and mongoose connect`);
    });
  } catch (e) {
    console.log(e);
  }
}

start();

