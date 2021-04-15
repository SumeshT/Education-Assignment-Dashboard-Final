import {Student} from '../models/student.js';

export const studentDetailsHandler = async (req,res,next) => {
    try{
        const stdDetails = await Student.findById(req.params.id);
        if(stdDetails){
            res.status(200).json(stdDetails);
        }
        else{
            res.status(404).json({message:"Student not found!"});
        }
    }
    catch{
        res.status(500).json({message:"Some issue occured in Server. Try after sometime"});
    }
    
}

export const updatePasswordHandler = async(req,res,next) =>{
    try{
        const std = await Student.findById(req.params.id);
        if(std){
            if(std.password === req.body.currentpassword){
                const updPassword = await Student.findByIdAndUpdate(req.params.id,{password:newpassword});
                res.status(200).json(updPassword);
            }
            else{
                res.status(400).json({message:"current password is not matched, Try Again"});
            }
        }
        else{
            res.status(404).json({message:"Student not found"});
        }
    }
    catch{
        res.status(500).json({message:"Some issue occured in Server. Try after sometime"});
    }

}

export const addCourseStudentHandler = async(req,res,next) =>{
    try{
        console.log(req.body);
        const updateCourses = await Student.updateMany(
            {'_id':{$in:req.body}},
            {
                $addToSet:{
                    courses:req.params.courseid
                },
            },
        );
        console.log(updateCourses);
        res.status(200).json(updateCourses);
    }
    catch(error){
        res.status(500).json(error.message);
    }
}

export const findstudentHandler = async(req,res,next)=>{
    try{
        const sem = Number(req.params.semester);
        const foundstudent = await Student.find({semester:sem});
        if(!foundstudent){
            res.status(404).json({message:"no student found"});
        }
        else{
            res.status(200).json(foundstudent);
        }
    }
    catch(error){
        res.status(500).json(error.message);
    }
}

export const getAllStudentHandler = async(req,res,next)=>{
    try{
        const allstudents = await Student.find({});
        res.status(200).json(allstudents);
    }
    catch(error){
        res.status(500).json(error.message);
    }
}

export const getAllCourseStudentHandler = async(req,res,next)=>{
    try{
        const allstudents = await Student.find({
            courses : req.params.courseid
        });
        res.status(200).json(allstudents);
    }
    catch(error){
        res.status(500).json(error.message);
    }
}

export const getAllSemesterStudentHandler = async(req,res,next)=>{
    try{
        const allstudents = await Student.find({
            semester : Number(req.params.semester)
        });
        res.status(200).json(allstudents);
    }
    catch(error){
        res.status(500).json(error.message);
    }
}