const jwt = require("jsonwebtoken");
const { UserModal } = require("../modal/user.modal");
const bcrypt = require("bcryptjs");
const Signup = async(req,res)=>{
    const {email, password, cpassword} = req.body;
    console.log(req.body)
   if(!email || !password || !cpassword){
       return  res.status(422).json({msg:"Please fill credintial"})
    }
    try {
        const userexist = await UserModal.findOne({email:email});
        if(userexist){
            return res.status(422).json({msg:"email already exist"})
        }
        else if(password !== cpassword){
            return  res.status(422).json({msg:"password is not matching"}) 
        }else{
            const user = new UserModal({email, password, cpassword});
        const userregister = await user.save();
        if(userregister){
            res.status(201).json({msg:"user reqister successfully"})
        }else{
            res.status(500).json({msg:"failed registered"})
        }
        }
        
    } catch (err) {
        console.log(err);
    }
}
const Signin=async(req,res)=>{
  try {
    let token;
     const {email,password}= req.body;
     if(!email || !password){
        return res.status(400).json({msg:"please filled the data"})
     }
     const userLogin = await UserModal.findOne({email:email});
     if(userLogin){
        const pwdmatch = await bcrypt.compare(password, userLogin.password);
         token = await userLogin.generateAuthToken();
         console.log(token);
         res.cookie("jwttoken", token,{
            expires:new Date(Date.now() + 25892000000),
            httpOnly:true,
         })
        if(!pwdmatch){
           res.status(400).json({msg:"password is not matched"})
        }else{
           res.status(201).json({msg:"user has login successfully"})
        }
     }else{
        res.status(400).json({msg:"user has not login successfully"})
     }
    
  } catch (error) {
    console.log(error);
  }
}
module.exports={
    Signup,
    Signin
}