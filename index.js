const express = require("express");
const mongoose = require("mongoose");
const {Connect} = require("./config/db");
const {User_Route} = require("./routes/user.routes");
const { secondhandcar} = require("./routes/secondhandcar.routes");
require("dotenv").config();
const cors = require("cors");
const Port = process.env.PORT || 8080;
const app = express();
app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.use(cors());
// app.get("/",(req,res)=>{
//     res.send("welcome to our TicketReservationSystem ")
// })
app.use("/", User_Route);
app.use("/", secondhandcar)
app.listen(Port,async()=>{
    try {
        await Connect;
        console.log("Connection Successfully")
    } catch (error) {
        console.log("Connection has not successfully");
        console.log(error);
    }
    console.log(`${Port}`)
})
