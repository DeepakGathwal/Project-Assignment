const express = require('express')
const cookieParser = require('cookie-parser')
const body = require('body-parser')
const cors = require('cors')
const connection = require('./conn/db')
const dotenv = require('dotenv')
const ErrorHandler = require('./middelwares/error')
dotenv.config({path:'./config/.env'});

const app = express();

app.use(cors({credentials:true,  origin: "*",
    allowedHeaders: "Authorization",  methods: "GET,POST,PUT,DELETE",}))
app.use(cookieParser())
app.use(express.json())
app.use(body.urlencoded({extended:false}))
connection();
app.use("/upload", express.static("./upload"))
const User = require('./routes/Userroute');
const Posts = require('./routes/Postroute');
app.use('/memories/user',User)
app.use('/memories/post',Posts)

app.use(ErrorHandler)

app.listen(process.env.PORT,() => {
    console.log(`Your Server Running on ${process.env.PORT}`);
})
