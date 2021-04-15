import express from 'express';
const router = express.Router();
import { updateSubmissionHandler, upload, uploadSubmissionHandler, delSubmissionHandler, allSubmissionHandler, updateMarksHandler, downloadSubmissionHandler, allStudentSubmissionHandler } from '../handlers/submissionHandler.js   ';


router.post('/uploadsubmission/:assignmentid',upload.single('file'),uploadSubmissionHandler);
router.put('/updatesubmission/:submissionid',upload.single('file'),updateSubmissionHandler);
router.delete('/deletesubmission/:submissionid',delSubmissionHandler);
router.get('/allsubmission/:courseid/:rollno',allSubmissionHandler);
router.post('/updatemarks/:submissionid',updateMarksHandler);
router.get('/downloadsubmission/:submissionid',downloadSubmissionHandler);
router.get('/allstudentsubmission/:assignmentid',allStudentSubmissionHandler);

export { router as default };
