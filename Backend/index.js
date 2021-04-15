import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import studentRoutes from './routes/studentRoutes.js';
import teacherRoutes from './routes/teacherRoutes.js';
import assignmentRoutes from './routes/assignmentRoutes.js';
import submissionRoutes from './routes/submissionRoutes.js';
import courseRoutes from './routes/courseRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

const app = express();

//database
const conn = mongoose.connect('mongodb://localhost/assignment-dashboard', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false });
mongoose.connection.on('connected', () => {
    console.log('Database is connected');
});
mongoose.connection.on('error',()=>{
    console.log('Error occured in connecting database');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());


app.use('/auth',authRoutes);
app.use('/student',studentRoutes);
app.use('/teacher',teacherRoutes);
app.use('/assignment',assignmentRoutes);
app.use('/submission',submissionRoutes);
app.use('/courses',courseRoutes);
app.use('/admin',adminRoutes);

//routes
app.get('/', (req,res)=>{
    res.send('get request');
});

//server
app.listen(5000, ()=>{
    console.log('Server has started on port: 5000');
})