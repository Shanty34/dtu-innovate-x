import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app=express()

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true,

}))

app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())


//routes import
import userRouter from "./routes/user.routes.js"
// import postRouter from "./routes/post.routes.js"
// import homeRouter from "./routes/home.routes.js"

// routes declaration
app.use("/api/v1/users",userRouter) //http://localhost:8000/api/v1/users/register or users/login
// app.use("/api/v1/posts",postRouter) //http://localhost:8000/api/v1/posts
// app.use("/api/v1/home",homeRouter) //http://localhost:8000/api/v1/posts

export {app}