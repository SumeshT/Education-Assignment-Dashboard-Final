import mongoose from "mongoose";
const { Schema, model} = mongoose;

const assignmentSchema = new Schema({
    
    name:{type:String,required:true},
    date: { type: String,required:true },
    time:{type:String,required:true},
    deadlinedate:{ type: String,required:true },
    deadlinetime:{type:String,required:true},
    file_mimetype:{type:String,required:true},
    courseid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Courses',
        required: true,
      },
    comment:{type:String},
    file_path: {
      type: String,
      required: true
    },
});
export const Assignment = model('AssignmentDetails',assignmentSchema);