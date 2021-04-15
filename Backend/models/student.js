import mongoose from "mongoose";
const { Schema, model} = mongoose;

const studentSchema = new Schema({
    
    name:{type:String,required:true},
    rollno: { type: String,required:true},
    semester: { type: Number,required:true },
    branch:{ type: String,required:true },
    email:{type:String,required:true},
    batch: { type: Number,required:true }, 
    password: { type: String,required:true },
    degree:{type:String,required:true},
    courses:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Courses',
      },]
});


export const Student = model('StudentDetails', studentSchema);