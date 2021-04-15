import React, {useState,useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import {useSelector, useDispatch} from 'react-redux';
import Axios from "axios";
import {API_URL} from "../utils/constants";

const useStyles = makeStyles((theme) => ({
    picture: {
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'top-center',
        height:'100vh',
    },
    appBar: {
        position: 'relative',
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
        marginLeft:'35px',
        marginRight:'35px'
    },
    removeButton:{
        position:'relative',
        top:33,
        '&:hover':{
            cursor:'pointer'
        }
    },
    addButton:{
        position:'relative',
        top:6,
        '&:hover':{
            cursor:'pointer'
        },
    },
    container: {
            display: 'flex',
            flexWrap: 'wrap',
    },
}));

export default function UploadAssignment(props) {
    const classes = useStyles();
    const [names, setNames] = useState('');
    const [descriptions, setDescriptions] = useState('');
    const [deadlines,setDeadlines] = useState('');
    const [files, setFiles] = useState('');

    const today = new Date();
    let todaydate = today.getFullYear();
    if(today.getMonth() + 1 < 10) todaydate += '-0' + (today.getMonth() + 1);
    else todaydate += '-' + (today.getMonth() + 1);
    if(today.getDate() < 10) todaydate += '-0' + today.getDate();
    else todaydate += '-' + today.getDate();

    let todaytime = "";
    if(today.getHours() < 10) todaytime += '0' + today.getHours();
    else  todaytime += today.getHours();
    if(today.getMinutes() < 10) todaytime += ':0' + today.getMinutes();
    else todaytime += ':' + today.getMinutes();
    // const todaydate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    // const todaytime = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();

    const linkedlist = props.match.params.courseid;

    const dispatch = useDispatch();

    const handleFileChange = ({target})=>{
        setFiles(target.files[0]);
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();
        const deadlinedate = deadlines.slice(0,10);
        const deadlinetime = deadlines.slice(11,16);
        const formdata = new FormData();
        formdata.append("name",names);
        formdata.append("comment",descriptions);
        formdata.append("file",files);
        formdata.append("courseid" , linkedlist);
        formdata.append("date" , todaydate);
        formdata.append("time" , todaytime);
        formdata.append("deadlinedate" , deadlinedate );
        formdata.append("deadlinetime" , deadlinetime);

        console.log(formdata);
        await Axios.post(`${API_URL}/assignment/uploadassignment`, formdata )
            .then((res)=>console.log("res",res.data))
            .catch((error)=>console.error(error));
        props.history.push(`/${linkedlist}/TeacherAssignments`);
    }
    return (
        <React.Fragment>
            {<div className={classes.picture}>
                    <main className={classes.layout}>
                        <Paper className={classes.paper}>
                            <Typography component="h1" variant="h4" align="center">
                                Add Assignment
                            </Typography>
                            <div className={classes.form}>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} >
                                        <TextField required id="name" name="name" label="Title" fullWidth onChange={(e)=>setNames(e.target.value)}/>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField required id="description" name="description" label="Description"  fullWidth onChange={(e)=>setDescriptions(e.target.value)} multiline />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <form className={classes.container} noValidate >
                                            <TextField onChange={(e)=>setDeadlines(e.target.value)}
                                                id="datetime-local"
                                                label="Deadline"
                                                type="datetime-local"
                                                defaultValue=""
                                                fullWidth
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            />
                                        </form>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <h3>
                                            Upload File
                                        </h3>
                                        <Button
                                            variant="contained"
                                            component="label"
                                        >
                                            <input onChange={handleFileChange}
                                                type="file"
                                            />
                                        </Button>
                                    </Grid>
                                </Grid>
                                <div className={classes.buttons}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handleSubmit}
                                        className={classes.button}
                                    >
                                        Add Assignment
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
