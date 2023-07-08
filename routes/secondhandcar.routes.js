const {Router} = require("express");
const { SecondHandCar,GetSecondHandCar,Details,updatecar} = require("../controller/secondhandcar.controller")
require("dotenv").config();
const secondhandcar = Router();
//post method
secondhandcar.post("/secondhandcar",  SecondHandCar);
//get method
secondhandcar.get("/secondhandcar", GetSecondHandCar);
// get method with id
secondhandcar.get("/secondhandcar/:id", Details);
//put method
secondhandcar.put("/editsecondhandcar/:id", updatecar);
module.exports= {
secondhandcar
}