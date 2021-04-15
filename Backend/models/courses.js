import mongoose from "mongoose";
const { Schema, model, Model, Types } = mongoose;

const coursesSchema = new Schema({
    coursename:{type:String,required:true},
    courseid:{type:String,required:true},
    section: { type: String,required:true }, 
    teacherid:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher',
        required: true,
      },
});

export const Courses = model('CoursesDetails',coursesSchema);