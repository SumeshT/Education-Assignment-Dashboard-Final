import express from 'express';
const router = express.Router();

import {
    teacherDetailsHandler,
    updatePasswordHandler,
    getAllTeachersHandler,
} from '../handlers/teacherHandler.js'

router.get('/teacherdetails/:id',teacherDetailsHandler);
router.put('/updatepassword/:id',updatePasswordHandler);
router.get('/allteachers',getAllTeachersHandler);

export { router as default };