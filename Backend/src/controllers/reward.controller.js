import mongoose from "mongoose";
import { User } from "../models/User.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Reward } from "../models/rewards.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { RewardTransaction } from "../models/rewardTransaction.models.js";
import { Transaction } from "../models/transaction.models.js";

const RewardHistory=asyncHandler(async (req, res) => {
    const history = await User.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(req.user._id)
            }
        },
        {
            $lookup: {
                from: "rewardtransactions",
                localField: "_id",
                foreignField: "owner",
                as: "rewardHistory"
            }
        },
        {
            $unwind: "$rewardHistory"
        },
        {
            $lookup: {
                from: "rewards",
                localField: "rewardHistory.reward",
                foreignField: "_id",
                as: "reward"
            }
        },
        {
            $unwind: "$reward"
        },
        {
            $replaceRoot: {
                newRoot: "$reward"
            }
        },
        
    ]);

    if(!history) throw new ApiError(409,"Error Fetching Reward History");
    res.status(200)
    .json(new ApiResponse(201,history,"Reward History Fetched"))
})
const RewardPost=asyncHandler(async(req,res)=>{
    const {title,description,coins,category,bg_color,task_id}=req.body;
    const TaskArray = task_id ? task_id.split(',') : [];
    const imageLocalPath=req.file?.path
    if (!imageLocalPath) throw new ApiError(301,"Image Not found in local path")

    const img = await uploadOnCloudinary(imageLocalPath);
    if (!img) throw new ApiError(400, "Image not found");

    const reward=await Reward.create({
        image:img.url,
        title,
        description,
        coins,
        category,
        task_id:TaskArray
    })
    res.status(200).json(new ApiResponse(201,reward,"Task Created"))

})
const getReward=asyncHandler(async(req,res)=>{
    const {reward_id}=req.body;
    if(!reward_id) throw new ApiError(404,"Reward id not provided");

    const thisReward=await Reward.aggregate([
        {
            $match:{
                _id:new mongoose.Types.ObjectId(reward_id)
            }
        },
        {
            $lookup: {
                from: 'tasks', // Name of the collection to join
                let: { taskIds: '$task_id' }, // The array of task IDs from the Reward document
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $in: [ '$_id', { $map: { input: '$$taskIds', as: 'id', in: { $toObjectId: '$$id' } } } ]
                            }
                        }
                    }
                ],
                as: 'tasks' // Alias for the joined tasks
            }
        }
    ])
    console.log(thisReward);

    res.status(201)
    .json(new ApiResponse(201,thisReward,"Reward fetched"))
})

const postRewardTrans=asyncHandler(async(req,res)=>{
    const{reward_id,task_id}=req.body;

    if(!task_id) throw new ApiError(402,"Atleast One Task must be completed");
    if(!(reward_id )) throw new ApiError(402,"Reward Id not Defined");
    const TaskArray = task_id ? task_id.split(',') : [];

    const rewardTransac=await RewardTransaction.create({
        owner:req.user._id,
        reward:reward_id,
        taskCompleted:TaskArray
    })

    res.status(201)
    .json(new ApiResponse(201,rewardTransac,"Reward Transaction Created"));
    
})

const fetchRewardsByInterest=asyncHandler(async(req,res)=>{
    const user=await User.findById(req.user._id);
    const fetchedReward=await Reward.find({category:user.interest})
    if(!fetchedReward) throw new ApiError(404,"No Reward Fetched");

    res.status(201)
    .json(new ApiResponse(201,fetchedReward,"Reward fetched by Interest"))
})

const checkRewardCompleted=asyncHandler(async(req,res)=>{
    const {reward_id}=req.body;
//    const currentReward = await RewardTransaction.findOne({reward:req.body.reward_id,owner:req.user._id});
//    if(!currentReward) throw new ApiError(404,"NO reward found");

//    if(currentReward.completed==true){
        const new_coins=await RewardTransaction.aggregate([
            {
                $match:{
                    reward:new mongoose.Types.ObjectId(reward_id),
                    owner:new mongoose.Types.ObjectId(req.user._id),
                    completed:true
                }

            },
            {
                $lookup:{
                    from:"users",
                    localField:"owner",
                    foreignField:"_id",
                    as:"user"
                }
            },
            {
                $lookup:{
                    from:"rewards",
                    localField:"reward",
                    foreignField:"_id",
                    as:"rewardTool"
                }
            },
            {
                $unwind: "$user"
            },
            {
                $unwind: "$rewardTool"
            },
            {
                $addFields:{
                    updatedcoins:{ $add: ["$user.coins", "$rewardTool.coins"] }
                }
            },
            {
                $project:{
                    updatedcoins:1
                }
            }
        ])
        if(!new_coins) throw new ApiError(409,"Reward is yet to be completed");
        const update=await User.updateOne({_id:req.user._id},{coins:new_coins[0].updatedcoins})
        if(!update) throw new ApiError(409,"Reward is yet to be completed");

    res.status(201)
    .json(new ApiResponse(201,update,"Coins Updated Successfuly"))
   
})

const postTransaction=asyncHandler(async(req,res)=>{
    const {trans_coin, transaction_title}=req.body;
    if(!(trans_coin && transaction_title)) throw new ApiError(404,"Complete Transaction Details not given");
    
    const user=await User.findById(req.user._id);
    if(!user) throw new ApiError(404,"User Not Found");

    const coin=user.coins-trans_coin;
    if (coin<0) throw new ApiError(401,"Insufficent Level Coins for Transaction");
    const result=await User.findOneAndUpdate({_id:req.user._id},{coins:coin})
    console.log(result)
    if(!result) throw new ApiError("Coins not updated");

    const transaction=await Transaction.create({
        transaction_title,
        owner:req.user._id,
        trans_coin:trans_coin*(-1)
    })
    if(!transaction) throw new ApiError("Transaction Not Created")

    res.status(201)
    .json(new ApiResponse(201,transaction,"Transaction Updated"))
})
const getAllTransactions=asyncHandler(async(req,res)=>{
    const allTransactions=await Transaction.find({owner:req.user._id});
    if(!allTransactions) throw new ApiError(404,"Not Transaction found");
    
    res.status(200)
    .json(new ApiResponse(200,allTransactions,"All Transactions Fetched"))
})
export {
    RewardHistory,
    RewardPost,
    postRewardTrans,
    getReward,
    fetchRewardsByInterest,
    checkRewardCompleted,
    postTransaction,
    getAllTransactions
}