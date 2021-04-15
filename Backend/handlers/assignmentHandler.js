import {Assignment} from '../models/assignment.js';
import moment from 'moment';
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

export const uploadAssignmentHandler = async(req, res) => {
    try{
        if(req.file){
            const newassignment = await Assignment.create({
                name:req.body.name,
                date:req.body.date,
                time:req.body.time,
                deadlinedate:req.body.deadlinedate,
                deadlinetime:req.body.deadlinetime,
                file_mimetype:res.req.file.mimetype,
                courseid:req.body.courseid, 
                comment:req.body.comment,
                file_path: res.req.file.path,
            });
            return res.status(200).json(newassignment);
            // return res.json({ success: true, image: res.req.file.path, fileName: res.req.file.filename })
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


export const updateAssignmentHandler = async(req,res,next)=>{
    try{
        const foundassignment = await Assignment.findById(req.params.assignmentid);
        if(!foundassignment){
            res.status(404).json({message:"assignment not found"});
        }
        if(req.body.afile !== foundassignment.afile)
             deleteFile(foundassignment.afile);
        if(req.file){
            const updateassignment = await Assignment.findByIdAndUpdate(req.params.assignmentid,{
                $set:{
                    name:req.body.name,
                    date:req.body.date,
                    time:req.body.time,
                    deadlinedate:req.body.deadlinedate,
                    deadlinetime:req.body.deadlinetime,
                    afile:res.req.file.path,
                    courseid:req.body.courseid, 
                    comment:req.body.comment,
                }
            });
            res.status(200).json(updateassignment);
            // return res.json({ success: true, image: res.req.file.path, fileName: res.req.file.filename })
        }
        else{
            return res.status(400).json({ success: false, message: "file type not supported" })
        }
    }
    catch(err){
        res.status(500).json(err.message);
    }
}

export const delAssignmentHandler = async(req,res,next)=>{
    try{
        const foundassignment = await Assignment.findById(req.params.assignmentid);
        if(!foundassignment){
            res.status(404).json({message:"assignment not found"});
        }
        deleteFile(foundassignment.afile);
        const delassignment = await Assignment.findByIdAndDelete(req.params.assignmentid);
        res.status(200).json({message:"success"});
    }
    catch(err){
        res.status(500).json(err.message);
    }
}


export const allAssignmentHandler = async(req,res,next) =>{
    try{
        const allassignment = await Assignment.find({courseid:req.params.courseid});
        if(!allassignment){
            res.status(404).json({message:"No Assignment"});
        }
        else{
            res.status(200).json(allassignment);
        }
        
    }
    catch(error){
        res.status(500).json(error.message);
    }
}

export const downloadAssignmentHandler = async(req,res,next) =>{
    try{
        const file= await Assignment.findOne({_id:req.params.assignmentid});
        let img = file.file_path;
        fs.access(img, fs.constants.F_OK, err => {
            console.log(`${img} ${err ? "does not exist" : "exists"}`);
          });
        fs.readFile(img, function(err, content) {
            if (err) {
              res.writeHead(404, { "Content-type": "text/html" });
              res.end("<h1>No such file</h1>");
            } else {
              //specify the content type in the response will be an image
              res.writeHead(200, { "Content-type": file.file_mimetype });
              res.end(content);
            }
          });
        } catch (error) {
          res.status(500).send('Error while downloading file. Try again later.');
        }
}