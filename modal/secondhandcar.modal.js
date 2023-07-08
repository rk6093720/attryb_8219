const mongoose = require("mongoose");

const secondhandcar = new mongoose.Schema({
    modelname:{type:String,require:true},
    image:{type:String,require:true},
    milege:{type:String,require:true},
    year:{type:String,require:true},
    price:{type:String,require:true},
    color:{type:String,require:true},
    description: { type: [String],required: true }
   
})

const SecondHandCarModal = mongoose.model("SECONDHANDCAR", secondhandcar);

module.exports={
    SecondHandCarModal
}