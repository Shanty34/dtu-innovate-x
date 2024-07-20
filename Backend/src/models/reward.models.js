import mongoose from "mongoose";

const rewardTransactionSchema=new mongoose.Schema({
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    reward:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Reward"
    },
    taskCompleted:{
        type:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"Task"
            }
        ],
        required:true
    },
    completed:{
        type:Boolean,
        require:true,
        default:false
    }
},{timestamps:true})

const RewardTransaction=mongoose.model("RewardTransaction",rewardTransactionSchema)