import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"

const userSchemas=new mongoose.Schema({
    fullname:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true,
        // unique:true
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        requried:true
    },
    avatar:{
        type:String,
    },
    interest:{
        type:String,
        enum:["Tech","Education","Health","Food","Fashion"],
        required:true
    },
    coins:{
        type:Number,
        default:0
    }
},{timestamps:true})

userSchemas.pre("save",async function(next){
    if(!this.isModified("password")) return next();

    this.password=await bcrypt.hash(this.password,10)
    next()
})

userSchemas.methods.isPasswordCorrect=async function(password){
    return await bcrypt.compare(password,this.password)
}

userSchemas.methods.generateAccessToken=async function(){
    return await jwt.sign(
        {
            _id:this._id,
            email:this.email,
            userName:this.userName,
            fullName:this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchemas.methods.generateRefreshToken=async function(){
    return await jwt.sign(
        {
            _id:this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}


export const User=mongoose.model("User",userSchemas)