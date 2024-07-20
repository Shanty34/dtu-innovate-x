import mongoose from "mongoose";
const taskSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    Description:{
        type:String,
        required:true
    }
},{timestamps:true})

const Task=mongoose.model("Task",taskSchema);