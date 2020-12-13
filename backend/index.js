const path = require("path");
// import thư viện cài đặt thêm
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
//import file
const config = require("./config/key");

// Khởi chạy express
const app = express();
const port = process.env.PORT || 5000;

// connect to mongoDB database
mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB Connected!!!"))
  .catch((err) => console.log(err));

// set JSON parse and cookie parse cho request
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

/*-----------Route for request add, update, delete item, user------------------ */
app.use("/items/", require("./controllers/items"));
app.use("/users/", require("./controllers/users"));
/*---------------------------------------------- */

// Serve index.html to server
const publicPath = path.join(__dirname, "..", "frontend/build");
app.use(express.static(publicPath));

app.get("*", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

app.listen(port, () => {
  console.log(`server listen on port ${port}`);
});
