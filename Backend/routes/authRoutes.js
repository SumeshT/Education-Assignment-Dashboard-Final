import express from 'express';
const router = express.Router();

import {
    signupHandler,
    signinHandler
} from '../handlers/authHandler.js'

router.post('/signup',signupHandler);
router.post('/signin',signinHandler);

export { router as default };