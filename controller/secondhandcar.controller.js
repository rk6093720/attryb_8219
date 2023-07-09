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
const deletecar = async(req,res)=>{
    const {id} = req.params;
    // console.log(id);
    try {
        const deleteCar = await SecondHandCarModal.findByIdAndDelete(id);
        res.status(200).json({msg:"delete car is  successfully", Success:true,deleteCar})   
    } catch (error) {
        console.log(error);
        res.status(404).json({msg:"delete car is not successfully"})
    }
}
const filterandsearchcar = async(req,res)=>{
    try{
    const { price,color, modelname ,sort} = req.query;
    const query = {};
    if (price) {
        query.price = { $regex: price, $options: 'i'};
        const [minPrice, maxPrice] = price.split('-');     
    if (minPrice && maxPrice) {
        query.price = { $gte: parseInt(minPrice), $lte: parseInt(maxPrice) };
      } else if (minPrice) {
        query.price = { $gte: parseInt(minPrice) };
      } else if (maxPrice) {
        query.price = { $lte: parseInt(maxPrice) };
      }
      }
   
  
   if (color) {
      query.color = { $regex: color, $options: 'i'};
    }
    if (modelname) {
      query.modelname = { $regex: modelname, $options: 'i' };
     
    }
    let sortOption = {};

    if (sort === 'asc') {
      sortOption = { price: 1 };
    } else if (sort === 'desc') {
      sortOption = { price: -1 };
    }
    console.log(query.price,sortOption);
   const secondhandcar = await SecondHandCarModal.find(query).sort(sortOption);
   if(secondhandcar.length === 0){
    return res.status(404).json({ msg: 'car is not products found' });
   }
   const car = secondhandcar.map((item)=>({
       modelname: item.modelname,
       image: item.image,
       milege: item.milege,
       year: item.year,
       price: item.price,
       color: item.color,
       description: item.description
   }))
    res.status(200).json({msg:"filter and search are successfully",car, Success:true});
  } catch (error) {
    res.status(500).json({msg:"filter and search are not successfully"});
  }
}
module.exports={
    SecondHandCar,
    GetSecondHandCar,
    Details,
    updatecar,
    deletecar,
    filterandsearchcar
}