import mongoose from "mongoose";
import { User } from "../models/User.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Task } from "../models/task.models.js";

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

export {
    postTask
}