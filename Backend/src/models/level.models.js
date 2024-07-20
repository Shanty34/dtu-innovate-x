import mongoose, { Types } from "mongoose";

const levelSchema = new mongoose.Schema({
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    level:{
        type:Number,
        default:1
    },
    xp:{
        type:Number,
        default:0
    }
})

export const Level = mongoose.model("Level",levelSchema)