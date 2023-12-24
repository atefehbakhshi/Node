const express = require("express");
const app = express();
const userRouter = require("./routes/users")

const morgan = require("morgan");
//use config to store global variables
// use custom-environment-variables.json file to set password for  example for data base
const config = require("config");

console.log("sms key", config.get("SMS"));

//parse body in req.body in post method
app.use(express.json());

//parse body of requests which was sended by urlencoded format
app.use(express.urlencoded({ extended: true }));

//show http requests in console
app.use(morgan("tiny"));

//users api's
app.use('/api/users', userRouter)

app.listen(3000, () => console.log("Listening on port 3000"));
