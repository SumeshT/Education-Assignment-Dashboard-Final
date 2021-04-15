import express from 'express';
const router = express.Router();

import {
    allCoursesHandler,
} from '../handlers/courseHandler.js'

router.post('/:id',allCoursesHandler);

export { router as default };