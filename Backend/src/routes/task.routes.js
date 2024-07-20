import { Router } from "express";
import {upload} from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { checkCompleteTask, postTask } from "../controllers/task.controller.js";

const router=Router()

router.route("/post-task").post(verifyJWT,postTask)
router.route("/complete-task").put(verifyJWT,checkCompleteTask)


export default router