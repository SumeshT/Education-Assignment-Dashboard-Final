import React,{useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";
import {CardActionArea, Container} from "@material-ui/core";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {courses} from "../actions/courseAction";
import AlertMessage from './alertMessage.js';
import Loading from "./Loading";
import {Launch} from "@material-ui/icons";


const useStyles = makeStyles((theme)=>({
    grid : {
        paddingTop : '20px',
        flexGrow : 1
    },
    root: {
        maxWidth: 400,
        marginBottom:'30px'
    },
    title: {
        fontSize: 14,
        paddingBottom : '15px'

    },
    gridadmin: {
        flexGrow : 1,
        padding : '20px'
    },
    button : {
        marginLeft : '20px'
    }
}));
export default function Course(props){
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo} = userLogin;
    const allCourse = useSelector((state) => state.coursearray);
    const {loading,error,coursearray} = allCourse;
    if(!userInfo){
        props.history.push('/');
    }
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(courses());
    }, [dispatch]);
    const classes = useStyles();

    return (
        <div className={classes.grid}>
            {loading ? (
                <Loading></Loading>
            ) : error ? (
                <AlertMessage type="error">{error}</AlertMessage>
            ) : ( coursearray.length === 0
                ? (<AlertMessage type="info">There are no Courses.</AlertMessage>)
                : (userInfo.type === 'student'
                ? (<Grid container spacing={3} className={classes.gridadmin}>
                    {coursearray.map((course)=> {
                return <Grid item xs = {2}>
                    <Card className={classes.root}>
                            <CardContent>
                                <Typography variant="h5">
                                    {course.coursename + " (" + course.courseid + ")"}
                                </Typography>
                                <Typography variant="h6" >
                                    Instructor: {course.name}
                                </Typography>
                                        <Link to = {`/${course._id}/StudentAssignments`}>
                                            <Launch fontSize= "large"/>
                                        </Link>
                            </CardContent>
                </Card>
                </Grid>
            })}</Grid>)
            : (userInfo.type === 'teacher'
               ? (<Grid container spacing={3} className={classes.gridadmin}>
                {coursearray.map((course)=> {
                    return <Grid item xs = {2}><Card className={classes.root}>
                        <CardContent>
                            <Typography variant="h5" component="h4">
                                {course.coursename + " (" + course.courseid + ")"}
                            </Typography>
                            <Typography>
                                Section: {course.section}
                            </Typography>
                            <Link to={`/${course._id}/TeacherAssignments`}>
                                <Launch fontSize="large"/>
                            </Link>
                        </CardContent>
                    </Card>
                    </Grid>
                })}</Grid>)
                    : ( <div>
                        <Grid container spacing={3}>
                                <Grid item xs={1.5}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    className={classes.button}
                                >
                                    <Link to = '/viewStudents' style = {{color : 'white'}}>
                                        View Students
                                    </Link>
                                </Button>
                                </Grid>
                                    <Grid item xs={1.5}>
                                    <Button
                                    variant="contained"
                                    color="primary"
                                    className={classes.button}
                                >
                                    <Link to = '/viewTeachers' style = {{color : 'white'}}>
                                        View Teachers
                                    </Link>
                                    </Button>
                                    </Grid>
                                        <Grid item xs={1.5}>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                className={classes.button}
                                            >
                                        <Link to = '/addData' style = {{color : 'white'}}>
                                            ADD DATA
                                        </Link>
                                            </Button>
                                </Grid>
                            <Grid container spacing={3} className={classes.gridadmin}>
                            {coursearray.map((course)=> {
                                return <Grid item xs = {2}>
                                        <Card className={classes.root}>
                                    <CardContent>
                                        <Typography variant="h5" component="h4">
                                            {course.coursename + " (" + course.courseid + ")"}
                                        </Typography>
                                        <Typography variant="h6" component="h4">
                                            Instructor: {course.name}
                                        </Typography>
                                        <Typography>
                                            Section: {course.section}
                                        </Typography>
                                        <Link to={`/course/${course._id}`}>
                                            <Launch fontSize="large"/>
                                        </Link>
                                    </CardContent>
                                </Card>
                                    </Grid>
                                })}
                            </Grid>
                            </Grid>
                    </div>
                        ))))}
        </div>
    )}
