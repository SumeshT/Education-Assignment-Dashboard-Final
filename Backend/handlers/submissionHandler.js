import {Submission} from '../models/submission.js';
import {Assignment} from '../models/assignment.js';
import mongoose from 'mongoose';
import path from 'path';
import multer from 'multer';
import fs from 'fs';


var storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'uploads/')
    },
    filename: function(req,file,cb){
        let ext = path.extname(file.originalname)
        cb(null,Date.now()+ext)
    }
})

export const upload = multer({
    storage:storage,
    fileFilter:function(req, file, callback){
        if(file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "application/pdf" || file.mimetype == "application/zip" || file.mimetype == "image/jpeg" || file.mimetype =="text/plain" || file.mimetype == "text/x-c++src" || file.mimetype == "text/x-python3" || file.mimetype == "text/x-csrc" || file.mimetype=="text/x-java"){
            callback(null,true) 
        }
        else{
            console.log("file type not supported");
            callback(null, false)
        }
    }
})

export const uploadSubmissionHandler = async(req, res) => {
    try{
        if(req.file){
            const foundAssignment = await Assignment.findById(req.params.assignmentid);
            if(!foundAssignment){
                res.status(404).json({message:"Assignment not found!"});
            }
            // write deadline part comparing time and date

            const newsubmission = await Submission.create({
                assignid:req.params.assignmentid,
                subdate:req.body.subdate,
                subtime:req.body.subtime,
                rollno:req.body.rollno,
                file_mimetype:res.req.file.mimetype,
                file_path: res.req.file.path,
                marks:req.body.marks, 
                comment:req.body.comment,
                status:req.body.status,
            });
            res.status(200).json(newsubmission);
            //return res.json({ success: true, image: res.req.file.path, fileName: res.req.file.filename })
        }
        else{
            return res.status(400).json({ success: false, message: "file type not supported" })
        }
    }
    catch(err){
        res.status(500).json(err.message);
    }
        
};

const deleteFile = (filepath) =>{

    fs.unlink(filepath,(err)=>{
        if(err){
            return false;
        }
        else{
            return true;
        }
    })
}

export const updateSubmissionHandler = async(req,res,next)=>{
    try{
        if(req.file){
            const foundsubmission = await Submission.findById(req.params.submissionid);
            if(!foundsubmission){
                res.status(404).json({message:"submission not found"});
            }
            if(req.body.afile !== foundsubmission.subfile)
                deleteFile(foundsubmission.subfile);
            const updatesubmission = await Submission.findByIdAndUpdate(req.params.submissionid,{
                $set:{
                    assignid:req.params.assignmentid,
                    subdate:req.body.date,
                    subtime:req.body.time,
                    rollno:req.body.rollno,
                    file_mimetype:res.req.file.mimetype,
                    file_path: res.req.file.path,
                    comment:req.body.comment,
                    status:req.body.status,
                }
            });
            res.status(200).json(updatesubmission);
            //return res.json({ success: true, image: res.req.file.path, fileName: res.req.file.filename })
        }
        else{
            return res.status(400).json({ success: false, message: "file type not supported" })
        }
    }
    catch(err){
        res.status(500).json(err.message);
    }
}

export const delSubmissionHandler = async(req,res,next)=>{
    try{
        const foundsubmission = await Submission.findById(req.params.submissionid);
        if(!foundsubmission){
            res.status(404).json({message:"submission not found"});
        }
        deleteFile(foundsubmission.subfile);
        const delsubmission = await Submission.findByIdAndDelete(req.params.submissionid);
        res.status(200).json({message:"success"});
    }
    catch(err){
        res.status(500).json(err.message);
    }
}

export const downloadSubmissionHandler = async(req,res,next) =>{
    try{
        const file= await Submission.findOne({_id:req.params.submissionid});
        let img = file.file_path;
        fs.access(img, fs.constants.F_OK, err => {
          });
        fs.readFile(img, function(err, content) {
            if (err) {
              res.writeHead(404, { "Content-type": "text/html" });
              res.end("<h1>No such file</h1>");
            } else {
              res.writeHead(200, { "Content-type": file.file_mimetype });
              res.end(content);
            }
          });
        } catch (error) {
          res.status(500).send('Error while downloading file. Try again later.');
        }
}

export const allSubmissionHandler = async(req,res,next)=>{
    try{
        const allassignment = await Assignment.aggregate([
            {$match:{courseid:mongoose.Types.ObjectId(req.params.courseid)}},
            {
                $lookup:{
                    from:'submissiondetails',
                    localField:"_id",
                    foreignField:"assignid",
                    as:"submission"
                } 
            },
             
        ]);
        
        for(let i = 0; i < allassignment.length; ++i){
            for(let j = 0; j < allassignment[i].submission.length; ++j){
                if(allassignment[i].submission[j].rollno !== req.params.rollno){
                    allassignment[i].submission.splice(j,1)
                    --j;
                }
            }
        }
        res.status(200).json(allassignment);
    }
    catch(err){
        res.status(500).json(err.message);
    }
}

export const updateMarksHandler = async(req,res,next) =>{
    try{
        const updatedsubmission = await Submission.updateOne(
            {'_id':req.params.submissionid},
            {
                $set:{
                    marks:Number(req.body.marks)
                },
            },
        );
        res.status(200).json(updatedsubmission);
    }
    catch(error){
        res.status(500).json(error.message);
    }
}

export const allStudentSubmissionHandler = async(req,res,next) =>{
    try{
        const allsub = await Submission.find({assignid:req.params.assignmentid});
        if(!allsub){
            res.status(404).json({"message":"No students submitted Assignment"});
        }
        else{
            res.status(200).json(allsub);
        }
    }
    catch(err){
        res.status(500).json(err.message);
    }
}