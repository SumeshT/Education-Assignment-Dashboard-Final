import {Student} from '../models/student.js';
import {Courses} from '../models/courses.js';
import { Teacher } from '../models/teacher.js';
import { Admin } from '../models/admin.js';

export const allCoursesHandler = async(req,res,next) =>{
    try{
        if(req.body.type === 'student'){
            const std = await Student.findById(req.params.id);
            if(!std){
                res.status(404).json({message:"User not found"});
            }
            const courses = await Courses.aggregate([
                {$match:{_id:{$in:std.courses}}},
                {
                    $lookup:{
                        from:'teacherdetails',
                        localField:"teacherid",
                        foreignField:"_id",
                        as:"tchrid"
                    } 
                },
                {
                    $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$tchrid", 0 ] }, "$$ROOT" ] } }
                 },
                 { $project: { tchrid: 0, email:0, password:0,branch:0 } }
            ]);
            res.status(200).json(courses);
        }
        else if(req.body.type === 'teacher'){
            const tchr = await Teacher.findById(req.params.id);
            if(!tchr){
                res.status(404).json({message:"User not found"});
            }
            const courses = await Courses.find({teacherid:tchr._id});
            res.status(200).json(courses);
        }
        if(req.body.type === 'admin'){
            const adm = await Admin.findById(req.params.id);
            if(!adm){
                res.status(404).json({message:"User not found"});
            }
            const courses = await Courses.aggregate([
                {
                    $lookup:{
                        from:'teacherdetails',
                        localField:"teacherid",
                        foreignField:"_id",
                        as:"tchrid"
                    } 
                },
                {
                    $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$tchrid", 0 ] }, "$$ROOT" ] } }
                 },
                 { $project: { tchrid: 0, email:0, password:0,branch:0 } }
            ]);
            res.status(200).json(courses);
        }
        
    }
    catch(error){
        res.status(500).json(error.message);
    }
}
