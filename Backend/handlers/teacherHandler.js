import {Teacher} from '../models/teacher.js';

export const teacherDetailsHandler = async (req,res,next) => {
    try{
        const tchDetails = await Teacher.findById(req.params.id);
        if(tchDetails){
            res.status(200).json(tchDetails);
        }
        else{
            res.status(404).json({message:"Teacher not found!"});
        }
    }
    catch{
        res.status(500).json({message:"Some issue occured in Server. Try after sometime"});
    }
    
}

export const updatePasswordHandler = async(req,res,next) =>{
    try{
        const tch = await Teacher.findById(req.params.id);
        if(tch){
            if(tch.password === req.body.currentpassword){
                const updPassword = await Teacher.findByIdAndUpdate(req.params.id,{password:newpassword});
                res.status(200).json(updPassword);
            }
            else{
                res.status(400).json({message:"current password is not matched, Try Again"});
            }
        }
        else{
            res.status(404).json({message:"Teacher not found"});
        }
    }
    catch{
        res.status(500).json({message:"Some issue occured in Server. Try after sometime"});
    }

}


export const getAllTeachersHandler = async(req,res,next)=>{
    try{
        const allteachers = await Teacher.find({});
        res.status(200).json(allteachers);
    }
    catch(error){
        res.status(500).json(error.message);
    }
}