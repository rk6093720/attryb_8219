const {Router} = require("express");
const {Signup, Signin} = require("../controller/user.controller");
require("dotenv").config();
const User_Route = Router();
User_Route.get("/",(req,res)=>{
    console.log("secondhandcar");
    res.send("welcome to secondhandcar")
})
// user signup
User_Route.post("/create", Signup);
// user login
User_Route.post("/login", Signin);

module.exports={ User_Route };