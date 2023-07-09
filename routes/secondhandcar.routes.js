const {Router} = require("express");
const { SecondHandCar,GetSecondHandCar,Details,updatecar,deletecar,filterandsearchcar} = require("../controller/secondhandcar.controller")
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
//delete method
secondhandcar.delete("/deletesecondhandcar/:id", deletecar);
//filter and search;
secondhandcar.get("/filterandsearchcar", filterandsearchcar);
module.exports= {
secondhandcar
}