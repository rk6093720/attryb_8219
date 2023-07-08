const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const userSchema = new mongoose.Schema({
    email:{ type:String, require:true},
    password:{type:String, require:true},
    cpassword:{type:String, require:true},
    tokens:[
        {
          token:{
            type:String, require:true
          }
        }
    ]
})
// here we are doing hashing for password ;
userSchema.pre('save', async function ( next) {
    // console.log("hellopre")
     if(this.isModified('password')){
        // console.log("hellopre")
        this.password=  await bcrypt.hash(this.password,12);
        this.cpassword= await bcrypt.hash(this.cpassword,12);
    }
    next();
});
// we are generating token
userSchema.methods.generateAuthToken= async function (){
    try {
        let token = jwt.sign({_id:this._id}, process.env.SECRET_KEY);
        this.tokens =this.tokens.concat({token:token});
        await this.save();
        return token;
    } catch (error) {
        console.log(error);
    }
}
const UserModal = mongoose.model("USER", userSchema);

module.exports={ UserModal }


