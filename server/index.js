const express = require("express");
const cookieParser = require("cookie-parser");
const body = require("body-parser");
const cors = require("cors");
const connection = require("./conn/db");
const dotenv = require("dotenv");
const ErrorHandler = require("./middelwares/error");
dotenv.config({ path: ".env" });

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(body.urlencoded({ extended: true }));

app.use(cors({credentials:true, origin:"http://localhost:3000", methods: "GET,POST,PUT,DELETE",}))


app.use(cookieParser());

connection();
app.use("/upload", express.static("./upload"));
const User = require("./routes/Userroute");
const Posts = require("./routes/Postroute");
app.use("/memories/user", User);
app.use("/memories/post", Posts);

app.use(ErrorHandler);

app.listen(process.env.PORT, () => {
  console.log(`Your Server Running on ${process.env.PORT}`);
});
