import {makeStyles} from "@material-ui/core/styles";
import {
    Card,
    Container,
    TextField
} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from "@material-ui/core/Button";
import {teacher} from "../actions/teacherAction";
import Axios from "axios";
import AlertMessage from "./alertMessage";
import Loading from "./Loading";
import {addcourse} from "../actions/courseAction";
import {Link} from "react-router-dom";
import Grid from "@material-ui/core/Grid";


const useStyles = makeStyles((theme) =>({
    card: {
        width : 400,
        marginBottom : 50,
        padding : 20
    },
    button : {
        width : 150,
        marginTop : 20
    },
    formControl : {
        marginTop : 20
    },
    select : {
        width : 350,
        marginTop:20,
        padding : 10
    },
    grid : {
        margin : '20px'
    }
}))
export default function AddData(props) {

    const classes = useStyles();

    const userLogin = useSelector((state) => state.userLogin);
    const allteacher = useSelector((state) => state.teacherarray);

    const { userInfo } = userLogin;
    const {loading, error, teacherarray} = allteacher;

    const [studentfile, setStudentFile] = useState('');
    const [teacherfile, setTeacherFile] = useState('');
    const [teachervalue, setTeacher] = useState('');
    const [coursename,setCoursename] = useState('');
    const [courseid, setCourseid] = useState('');
    const [section , setSection] = useState('');


    const handleStudentFileChange = ({target})=>{
        setStudentFile(target.files[0]);
    }

    const handleteacherFileChange = ({target})=>{
        setTeacherFile(target.files[0]);
    }

    const handleSubmitStudent = async (e) =>{
        e.preventDefault();
        const formdata = new FormData();
        formdata.append("file",studentfile);
        await Axios.post(`/admin/addstudent/${userInfo._id}`, formdata )
            .then((res)=>props.history.push('/course'))
            .catch((error)=>console.error(error));
    }
    const handleSubmitTeacher = async (e) =>{
        e.preventDefault();
        const formdata = new FormData();
        formdata.append("file",teacherfile);
        await Axios.post(`/admin/addteacher/${userInfo._id}`, formdata )
            .then((res)=>props.history.push('/course'))
            .catch((error)=>console.error(error));
    }

    const handleSubmitCourse = (e) => {
        e.preventDefault();
        if (coursename && courseid && section && teachervalue) {
            dispatch(addcourse({
                coursename : coursename,
                courseid : courseid,
                section : section,
                teacherid : teachervalue
            }))
            props.history.push('/course');
        }
    };

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(teacher());
    },[dispatch]);

    return(
        <div>
            <Grid container spacing={3}>
                <Grid item xs = {4} className={classes.grid}>
            <Card className={classes.card}>
                <h3>
                    UPLOAD TEACHER LIST
                </h3>
            <Button variant="contained" component="label">
                <input onChange={handleteacherFileChange}
                       type="file"
                       accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                />
            </Button>
                <Button variant="contained"
                        color="primary" className={classes.button} onClick={handleSubmitTeacher}>
                    SUBMIT
                </Button>
            </Card>
                </Grid>
                <Grid item xs = {6} className={classes.grid}>
                <Card className={classes.card}>
                <h3>
                    UPLOAD STUDENT LIST
                </h3>
            <Button variant="contained" component="label">
                <input onChange={handleStudentFileChange}
                       type="file"
                       accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                />
            </Button>
                <Button variant="contained"
                        color="primary" className={classes.button} onClick={handleSubmitStudent}
                >
                    SUBMIT
                </Button>
            </Card>
                </Grid>
                <Grid item xs = {6} className={classes.grid}>
                <Card className={classes.card}>
                <h3>
                    <Link>

                    </Link>
                    ADD COURSE
                </h3>
                <form>
                    <TextField label='Course Name' name='coursename' onChange={(e) => setCoursename((e.target.value))} fullWidth required/>
                    <TextField label='Course Id' name='courseid' onChange={(e) => setCourseid((e.target.value))} fullWidth required/>
                    <TextField label='Section' name='section' onChange={(e) => setSection((e.target.value))} fullWidth required/>
                    {loading ? (
                        <Loading></Loading>
                    ) : error ? (
                        <AlertMessage type="error">{error}</AlertMessage>
                    ) : ( teacherarray.length === 0
                        ? (<AlertMessage type="info">There are no Courses.</AlertMessage>)
                        :
                        (<select className={classes.select} value={teachervalue} onChange={(e) => setTeacher((e.target.value))} >
                            <option>
                                Select Teacher
                            </option>
                            {teacherarray.map(teacher => {
                                return (
                                    <option key={teacher._id} value={teacher._id}>{teacher.teacherid}-{teacher.name} </option>
                                )
                            })}
                        </select>)
                    )}
                    <Button variant="contained"
                            color="primary" className={classes.button} onClick={handleSubmitCourse}>
                        SUBMIT
                    </Button>
                </form>
            </Card>
                </Grid>
            </Grid>
        </div>
    )
}
