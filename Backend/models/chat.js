import mongoose from "mongoose";
const { Schema, model} = mongoose;

const chatSchema = new Schema({
    
    name:{type:String,required:true},
    rollno:[],
    courseid: { type: String,required:true },
    section:{ type: String,required:true },
    message:{type:String,required:true},
    teacherid: { type: String,required:true }, 
    semester:{type:Number,required:true},
    timestamp: { type: String,required:true },
});
export const Chat = model('ChatDetails',chatSchema);
