const {SecondHandCarModal}= require("../modal/secondhandcar.modal");
const mongoose = require("mongoose");
const SecondHandCar = async(req,res)=>{
    const {  modelname,image,milege,year,price,color,description}=req.body;
    const NewSecondHandCar = new SecondHandCarModal({
        modelname,image,milege,year,price,color,description
    })
  try {
     await NewSecondHandCar.save();
    res.status(201).json({msg:"secondhandcar is created successfully",Success:true,NewSecondHandCar})
  } catch (error) {
    console.log(error);
    res.status(404).json({msg:"secondhandcar is not created successfully"})
  }
}
const GetSecondHandCar= async(req,res)=>{
    try {
        const GetSecondhandcar = await SecondHandCarModal.find();
        res.status(200).json({msg:"secondhandcar is not geting successfully ",Success:true,GetSecondhandcar});
    } catch (error) {
        console.log(error);
        res.status(404).json({msg:"secondhandcar is not geting successfully "})
    }
}

const Details = async(req,res)=>{
const {id} = req.params
    // console.log(id)
try {
    const details = await SecondHandCarModal.findById({_id:id} );
      await details.save();
      res.status(200).json({msg:"Details is getting",Success:true,details})
    } catch (error) {
        console.log(error);
        res.status(404).json({msg:"Details is not getting"})
    }
}

//update car by put method;
const updatecar = async(req,res)=>{
    const {id} =req.params;
    const {  modelname,image,milege,year,price,color,description}=req.body;
//   console.log(id);
   const newUpdatedCar = {  modelname,image,milege,year,price,color,description};
   try {
        await SecondHandCarModal.findByIdAndUpdate( id,newUpdatedCar,{new:true});
        res.status(201).json({msg:"updated car is successfully",newUpdatedCar,Success:true})
    } catch (error) {
        console.log(error);
        res.status(404).json({msg:"update car is not successfully"})
    }
}
module.exports={
    SecondHandCar,
    GetSecondHandCar,
    Details,
    updatecar
}