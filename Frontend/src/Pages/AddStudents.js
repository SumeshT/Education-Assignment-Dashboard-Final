import React, {useState,useEffect} from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import {useSelector, useDispatch} from 'react-redux';
import Axios from "axios";
import {TextField} from "@material-ui/core";
import {addCourseStudent, semesterstudent} from "../actions/studentAction";
import AlertMessage from "./alertMessage";
import Loading from "./Loading";
import { Multiselect } from 'multiselect-react-dropdown';


const useStyles = makeStyles((theme) => ({
    picture: {
        height:'100vh',
    },
    layout: {
        paddingTop:'60px',
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            width: 600,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        },
    },
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    button: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
    },
    form:{
        marginRight:'35px',
        marginTop : '35px'
    },
}));

export default function AddStudents(props) {
    const classes = useStyles();
    const [semester,setSemester] = useState('');

    const dispatch = useDispatch();
    const handleSemesterChange = (e) => {
        e.preventDefault();
        if (semester) {
            dispatch(semesterstudent(semester));
        }
    };

    const userLogin = useSelector((state) => state.userLogin);
    const allstudents = useSelector((state) => state.studentarray);
    const { userInfo } = userLogin;
    const {loading, error, studentarray} = allstudents;
    const [studentlist,setStudentList] = useState([]);

    const addId = (selectedList) => {
        let arr = [];
        for(let i = 0;i < selectedList.length;i++){
            arr.push(selectedList[i]._id);
        }
        return arr;
    }

    const onSelect = (selectedList, selectedItem) => {
        setStudentList(addId(selectedList));
    }

    const onRemove = (selectedList, removedItem) => {
        setStudentList(addId(selectedList));
    }

    const linkedlist = props.match.params.courseid;
    const handleSubmitChange = (e) => {
        e.preventDefault();
        console.log(studentlist);
        if (studentlist) {
            dispatch(addCourseStudent(studentlist,linkedlist));
        }
        props.history.push(`/course/${linkedlist}`);
    };

    return (
        <React.Fragment>
            {<div className={classes.picture}>
                <main className={classes.layout}>
                    <Paper className={classes.paper}>
                        <Typography component="h1" variant="h4" align="center">
                            Add Student
                        </Typography>
                        <form>
                            <TextField label='Enter Semester' name='semester' onChange={(e) => setSemester((e.target.value))}required/>
                            <Button variant="contained"
                                    color="primary" className={classes.button} onClick={handleSemesterChange}>
                                SUBMIT
                            </Button>
                        </form>
                        <div className={classes.form}>
                            {( studentarray && studentarray.length === 0
                                    ? (<AlertMessage type="info">There are no Students.</AlertMessage>)
                                    :
                                    ( <Multiselect
                                        options={studentarray}
                                        onSelect={onSelect}
                                        onRemove={onRemove}
                                        displayValue="rollno"
                                        showCheckbox
                                    />)
                            )}
                            <div className={classes.buttons}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    className={classes.button}
                                    onClick={handleSubmitChange}
                                >
                                    Add Student
                                </Button>
                            </div>
                        </div>
                    </Paper>
                </main>
            </div>
            }
        </React.Fragment>
    );
}
