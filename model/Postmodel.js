const mongoose=require("mongoose");
const postSchema=mongoose.Schema({
    title:{type:String,required:true},
    body:{type:String,required:true},
    device:String,
    no_of_comments:{type:Number,required:true},
    user:String
    })
    const Postmodel=mongoose.model("post",postSchema)
    module.exports={
        Postmodel
    }