import mongoose from "mongoose";
const { Schema, model, Model, Types } = mongoose;

const adminSchema = new Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
});

export const Admin = model('AdminDetails',adminSchema);
