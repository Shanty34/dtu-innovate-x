import { Router } from "express";
import {upload} from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { postTask } from "../controllers/task.controller.js";

const router=Router()

router.route("/post-task").post(verifyJWT,postTask)

export default router