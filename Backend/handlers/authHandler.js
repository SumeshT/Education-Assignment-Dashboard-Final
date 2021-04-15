import { Admin } from '../models/admin.js';
import {Student} from '../models/student.js';
import {Teacher} from '../models/teacher.js';

export const signupHandler = async (req,res,next) => {
    try{
        if(req.body.type === 'student'){
            const findstudent = await Student.findOne({ email: req.body.email });
            if(findstudent){
                res.status(200).json({message:"user already exists!"});
            }
            else{
                let newstudent = new Student({
                    name:req.body.name,
                    rollno: req.body.rollno,
                    semester: req.body.semester,
                    branch:req.body.branch,
                    email:req.body.email,
                    academicyear: req.body.academicyear, 
                    semester:req.body.semester,
                    password: req.body.password,
                    degree:req.body.degree,
                    section: req.body.section,
                    courses:req.body.courses
                })
                
                const student = await newstudent.save();
                res.status(201).json(student);
            }
        }
        else{
        //     const findteacher = await Teacher.findOne({ email: req.body.email });
        //     if(findteacher){
        //         res.status(200).json({message:"user already exists!"});
        //     }
        //     else{
        //         let newteacher = new Teacher({
        //             email:req.body.email,
        //             name:req.body.name,
        //             password:req.body.password
        //         })
                
        //         const teacher = await newteacher.save();
        //         res.status(201).json(teacher);
        //     }
         }
        
    }
    catch(error){
        res.status(500).json(error.message);
    }
    
};

export const signinHandler = async (req,res,next) => {
    try{
        let email = req.body.email;
        let password = req.body.password;
        if(req.body.type === 'student'){
            const user = await Student.findOne({ email: email });
            if(!user){
                res.status(404).json({message:"Invalid User!"});
            }
            else if(user.password !== password){
                res.status(400).json({message:"Incorrect Password!"});
            }
            else{
                user.set('type','student',{strict:false});
                res.status(200).json(user);
            }
        }
        else if(req.body.type === 'teacher'){
            const user = await Teacher.findOne({ email: email });
            if(!user){
                res.status(404).json({message:"Invalid User!"});
            }
            else if(user.password !== password){
                res.status(400).json({message:"Incorrect Password!"});
            }
            else{
                user.set('type', 'teacher',{strict:false});
                res.status(200).json(user);
            }
        }
        else if(req.body.type === 'admin'){
            const user = await Admin.findOne({ email: email });
            if(!user){
                res.status(404).json({message:"Invalid User!"});
            }
            else if(user.password !== password){
                res.status(400).json({message:"Incorrect Password!"});
            }
            else{
                user.set('type', 'admin',{strict:false});
                res.status(200).json(user);
            }
        }
        
    }
    catch(error){
        res.status(500).json(error.message);
    }
    
};