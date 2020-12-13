// import thư viện cài đặt thêm
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const cors = require("cors");

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
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

/*-----------Route for request add, update, delete item, user------------------ */
app.use("/items/", require("./controllers/items"));
app.use("/users/", require("./controllers/users"));
/*---------------------------------------------- */

app.listen(port, () => {
  console.log(`server listen on port ${port}`);
});
