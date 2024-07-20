import mongoose, { mongo } from "mongoose";
const transactionSchema=new mongoose.Schema({
    transaction_title:{
        type:String,
        required:true
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    trans_coin:{
        type:Number,
        required:true,
        default:0
    }
},{timestamps:true})

export const Transaction=mongoose.model("Transaction",transactionSchema);