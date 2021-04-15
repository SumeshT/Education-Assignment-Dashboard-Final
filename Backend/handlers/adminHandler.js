import {Student} from '../models/student.js';
import {Teacher} from '../models/teacher.js';
import {Courses} from '../models/courses.js';
import moment from 'moment';
import path from 'path';
import multer from 'multer';
import fs from 'fs';
import  xlsxj from 'xlsx-to-json';
import { Admin } from '../models/admin.js';


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
        if(file.mimetype=="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"){
            callback(null,true) 
        }
        else{
            console.log("file type not supported");
            callback(null, false)
        }
    }
})


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

export const addStudentHandler = async(req, res) => {
    try{
        const foundAdmin = await Admin.findById(req.params.adminid);
        if(!foundAdmin){
            res.status(404).json("admin not found");
        }
        else{
            if(req.file){
                const filepath = req.file.path; 
                const result = xlsxj({
                    input:req.file.path,  // input xls
                    output: null, // output json
                    lowerCaseHeaders:true
                }, async(err, result) => {
                    if(err) {
                      res.json(err);
                    } else {
                        const newstudents = await Student.insertMany(result);
                        deleteFile(filepath);
                        res.status(200).json(newstudents);
                     }
                });
            }
            else{
                return res.status(400).json({ success: false, message: "file type not supported" })
            }
        }
        
    }
    catch(err){
        res.status(500).json(err.message);
    }
        
};


export const addTeacherHandler = async(req, res) => {
    try{
        const foundAdmin = await Admin.findById(req.params.adminid);
        if(!foundAdmin){
            res.status(404).json("admin not found");
        }
        else{
            if(req.file){
                const filepath = req.file.path; 
                const result = xlsxj({
                    input:req.file.path,  // input xlsx
                    output: null, // output json
                    lowerCaseHeaders:true
                }, async(err, result) => {
                    if(err) {
                      res.status(400).json(err);
                    } else {
                        const newteachers = await Teacher.insertMany(result);
                        deleteFile(filepath);
                        res.status(200).json(newteachers);
                     }
                });
            }
            else{
                return res.status(400).json({ success: false, message: "file type not supported" })
            }
        }
        
    }
    catch(err){
        res.status(500).json(err.message);
    }
        
};

export const addCourseHandler = async(req,res,next) =>{
    try{
        const foundAdmin = await Admin.findById(req.params.adminid);
        if(!foundAdmin){
            res.status(404).json("admin not found");
        }
        else{
            const newcourse = await Courses.create({
                coursename:req.body.coursename,
                courseid:req.body.courseid,
                section:req.body.section,
                teacherid: req.body.teacherid
            });
            res.status(200).json(newcourse);
        }
        
    }
    catch(error){
        res.status(500).json(error.message);
    }
}