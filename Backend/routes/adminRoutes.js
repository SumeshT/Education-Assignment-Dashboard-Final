import express from 'express';
const router = express.Router();
import { addStudentHandler, upload,addCourseHandler,addTeacherHandler} from '../handlers/adminHandler.js';

router.post('/addstudent/:adminid',upload.single('file'),addStudentHandler);
router.post('/addteacher/:adminid',upload.single('file'),addTeacherHandler);
router.post('/addcourse/:adminid',addCourseHandler);

export { router as default };
