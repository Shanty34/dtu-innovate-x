import { Router } from "express";
import { changeCurrentPassword, getConnections, getCurrentUser, getUserChannelProfile, loginUser, logoutUser, refreshAccessToken, registerUser, searchUser, updateAccountDetails, updateUserAvatar } from "../controllers/user.controller.js";
import {upload} from "../middlewares/multer.middleware.js"
// import { getProfileDetails} from "../controllers/post.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";


const router=Router()

router.route("/register").post(
    upload.fields([
        {
            name:"avatar",
            maxCount:1
        },
    ]),
    registerUser
)
router.route("/login").post(loginUser);

// secure routes
router.route("/logout").post(verifyJWT,logoutUser);
router.route("/refresh-token").post(refreshAccessToken);

// router.route("/change-password").post(verifyJWT,changeCurrentPassword)
// router.route("/current-user").get(verifyJWT,getCurrentUser)
// router.route("/update-Account-details").patch(verifyJWT,updateAccountDetails)
// router.route("/avatar").patch(verifyJWT,upload.single("avatar"),updateUserAvatar)
// router.route("/c/:username").get(verifyJWT,getUserChannelProfile)
// router.route("/history").get(verifyJWT,getPostHistory)

// Subscription Info
// router.route("/update-subscription").patch(verifyJWT,updateSubscription)
// Profile Info
// // router.route("/profile").get(verifyJWT,getProfileDetails)
// router.route("/connections").post(verifyJWT,getConnections)
// router.route("/search").post(verifyJWT,searchUser)


// router.route("/login").post(login)

export default router