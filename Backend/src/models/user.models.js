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
    }
},{timestamps:true})

export const User=mongoose.model("User",userSchemas)