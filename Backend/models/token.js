import mongoose from "mongoose";
const { Schema, model} = mongoose;

const studentSchema = new Schema({
    email:{type:String,required:true},
    token: { type: String,required:true }, 
    expire:{type: Date, default: Date.now, index: { expires: 86400000 }},
    role: { type: String,required:true }
});


export const Student = model('StudentDetails', studentSchema);