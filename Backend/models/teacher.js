import mongoose from "mongoose";
const { Schema, model, Model, Types } = mongoose;

const teacherSchema = new Schema({
    name:{type:String,required:true},
    teacherid:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    branch:{ type: String,required:true}
});

export const Teacher = model('TeacherDetails',teacherSchema);
