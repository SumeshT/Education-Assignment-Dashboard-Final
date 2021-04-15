import mongoose from "mongoose";
const { Schema, model} = mongoose;

const submissionSchema = new Schema({
    
    subdate:{type:String,required:true},
    subtime:{type:String,required:true},
    assignid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Assignment',
        required: true,
      },
    rollno: { type: String,required:true },
    marks:{type:Number},
    comment:{type:String},
    status: { type: String},
    file_path: {
      type: String,
      required: true
    },
    file_mimetype:{type:String,required:true},
});
export const Submission = model('SubmissionDetails',submissionSchema);