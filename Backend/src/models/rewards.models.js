import mongoose from "mongoose";


const rewardsSchema= new mongoose.Schema({
    Image:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true,
    },
    discription:{
        type:String,
        required:true,
    },
    coins:{
        type:Number,
        required:true,
    },
    category:{
        type:String,
        enum:["Tech","Education","Health","Food","Fashion"],
        required:true,
    },
    bg_color:{
        type:String,
        default:"#FFFFFF"
    },
    task_id:{
        type:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"Task"
            }
        ]
    }

})


export const Reward = mongoose.model("Reward", rewardsSchema);