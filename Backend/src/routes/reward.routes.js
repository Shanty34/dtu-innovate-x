import { Router } from "express";
import {upload} from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { fetchRewardsByInterest, getReward, postRewardTrans, RewardHistory, RewardPost } from "../controllers/reward.controller.js";

const router=Router()


router.route("/reward-history").get(verifyJWT,RewardHistory);
router.route("/reward-post").post(verifyJWT, 
    upload.single("image")
    ,RewardPost);
router.route("/reward-transac").post(verifyJWT,postRewardTrans);
router.route("/reward").post(verifyJWT,getReward);
router.route("/fetch-reward-interest").get(verifyJWT,fetchRewardsByInterest);


export default router