import express from 'express';
const router = express.Router();
import { downloadAssignmentHandler, updateAssignmentHandler, upload, uploadAssignmentHandler, delAssignmentHandler, allAssignmentHandler } from '../handlers/assignmentHandler.js   ';

router.get('/allassignment/:courseid',allAssignmentHandler);
router.post('/uploadassignment',upload.single('file'),uploadAssignmentHandler);
router.put('/updateassignment/:assignmentid',upload.single('file'),updateAssignmentHandler);
router.delete('/deleteassignment/:assignmentid',delAssignmentHandler);
router.get('/downloadassignment/:assignmentid',downloadAssignmentHandler);

export { router as default };
