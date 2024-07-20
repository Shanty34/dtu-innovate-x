import mongoose from "mongoose";
import { User } from "../models/User.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Task } from "../models/task.models.js";
import { Reward } from "../models/rewards.models.js";
import { RewardTransaction } from "../models/rewardTransaction.models.js";

const postTask=asyncHandler(async (req, res) => {
    const {title,description}=req.body;
    if(!(title && description)) throw new ApiError(500,"Title or Description not found");

    const task=await Task.create({
        title,
        description
    })
    
    if(!task) throw new ApiError(404,"Task Not Created");
    
    console.log(task);
    res.status(200)
    .json(new ApiResponse(201,task,"Task Created"))
})

const checkCompleteTask=asyncHandler(async(req,res)=>{
    const currentreward=await Reward.findById(req.body.reward_id);

    const currentrewardTransaction=await RewardTransaction.findOne({reward:req.body.reward_id,owner:req.user._id});
    console.log(currentrewardTransaction)

    console.log(currentrewardTransaction.taskCompleted,currentreward.task_id);
    if(currentreward.task_id.length===currentrewardTransaction.taskCompleted.length){
        const data=await RewardTransaction.updateOne({_id:currentrewardTransaction._id},{completed:true})
        if(!data) throw new ApiError(500,"error in updating reward transation");

           return res.status(201).json(new ApiResponse(201, data,"Reward Transaction Updated Successfully"));
    }else{
        throw new ApiError(500,"not all tasks are completed");
    }

    
})

export {
    postTask,
    checkCompleteTask
}