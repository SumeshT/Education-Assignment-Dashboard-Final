import express from 'express';
const router = express.Router();

import {
    findstudentHandler,
    studentDetailsHandler,
    updatePasswordHandler,
    getAllStudentHandler,
    getAllCourseStudentHandler,
    getAllSemesterStudentHandler,
    addCourseStudentHandler
} from '../handlers/studentHandler.js'

router.get('/studentdetails/:id',studentDetailsHandler);
router.put('/updatepassword/:id',updatePasswordHandler);
router.get('/findstudent/semester',findstudentHandler);
router.get('/allstudents',getAllStudentHandler);
router.get('/coursestudents/:courseid',getAllCourseStudentHandler);
router.get('/semesterstudents/:semester',getAllSemesterStudentHandler);
router.put('/addcoursestudent/:courseid',addCourseStudentHandler);


export { router as default };