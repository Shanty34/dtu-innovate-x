import { Router } from "express";
import {upload} from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { checkRewardCompleted, fetchRewardsByInterest, getReward, postRewardTrans, RewardHistory, RewardPost } from "../controllers/reward.controller.js";
import { fetchRewardsByInterest, getAllTransactions, getReward, postRewardTrans, postTransaction, RewardHistory, RewardPost } from "../controllers/reward.controller.js";

const router=Router()


router.route("/reward-history").get(verifyJWT,RewardHistory);
router.route("/reward-post").post(verifyJWT, 
    upload.single("image")
    ,RewardPost);
router.route("/reward-transac").post(verifyJWT,postRewardTrans);
router.route("/reward").post(verifyJWT,getReward);
router.route("/fetch-reward-interest").get(verifyJWT,fetchRewardsByInterest);
router.route("/reward-completed").post(verifyJWT,checkRewardCompleted);

router.route("/post-transaction").post(verifyJWT,postTransaction);
router.route("/all-transactions").get(verifyJWT,getAllTransactions);


export default router