const express = require("express");
// const bodyParser = require("body-parser");
const mongoose = require("mongoose");
// const routes = require("./routes/index");

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect("mongodb://localhost:27017/mestodb");

//   , {
//   useNewUrlParser: true,
//   useCreateIndex: true,
//     useFindAndModify: false
// });

app.use((req, res, next) => {
  req.user = {
    _id: "643152c448af5508f72f1a3d",
  };
  next();
});

app.listen(PORT, () => {
  console.log(
    `The application listens on the port from which the server is started: http://localhost:${PORT}`
  );
});
