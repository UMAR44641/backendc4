const express=require("express")
const {connection}=require("./configs/db")
const jwt=require("jsonwebtoken");
const { userRouter } = require("./routes/userRoutes");
const {postRouter}=require("./routes/postRoutes");
const { authenticate } = require("./middlewares/authentication");
const cors=require("cors");
const device=require("express-device");
require("dotenv").config();
const app=express()
app.use(express.json())
app.use(cors());
app.use('/users',userRouter);
app.use(authenticate);
app.use(device.capture())
device.enableViewRouting(app);
app.use('/posts',postRouter);
app.get("/",(req,res)=>{
    res.send("Home page")
})
app.listen(process.env.PORT,async ()=>{
   try{
       await connection
       console.log("connected to db")
    }catch(err){
       console.log(err)
    }
     console.log("Running at 8080 Port")
})
