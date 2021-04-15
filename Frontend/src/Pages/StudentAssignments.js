import React,{useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Card,TextField} from '@material-ui/core';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";
import {IconButton} from "@material-ui/core";
import {Add, Assignment, Edit, GetApp, Publish} from "@material-ui/icons";
import {Link} from "react-router-dom";
import Container from "@material-ui/core/Container"
import {useDispatch, useSelector} from "react-redux";
import {getAssignmentSubmission} from "../actions/assignsubmissionAction";
import Loading from "./Loading";
import AlertMessage from "./alertMessage";
import Popover from '@material-ui/core/Popover';
import Axios from "axios";
import { API_URL } from '../utils/constants';
import download from 'downloadjs';
import axios from "axios";



const useStyles = makeStyles((theme) => ({
    grid : {
        padding : '20px'
    },
    root: {
        marginBottom:'30px',
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
        fontSize: 14,
    },
    title: {
        fontSize: 20,
        paddingBottom : '15px',
    },
    add : {
        verticalAlign : "middle"
    },
    submitbutton : {

    }, popover:{
        height:'50px'
    },
    sub:{
        marginTop: 20
    }
}));
export default function StudentAssignments(props){
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo} = userLogin;
    const [anchorEl, setAnchorEl] = React.useState(null);

    const popoverClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const popoverClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const classes = useStyles();
    const allAssignments = useSelector((state) => state.assignsubmissionarray);
    const {loading,error,assignsubmissionarray} = allAssignments;
    const dispatch = useDispatch();
    const linkedlist = props.match.params.courseid;
    const [files, setFiles] = useState('');
    const [aid,setAid] = useState('');
    const [comment,setComment] = useState('');

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

    const [errorMsg, setErrorMsg] = useState('');
    const downloadFile = async (id, mimetype,path) => {
        try {
            const result = await axios.get(`${API_URL}/assignment/downloadassignment/${id}`, {
                responseType: 'blob'
            });
            const split = path.split('/');
            const filename = split[split.length - 1];
            setErrorMsg('');
            return download(result.data,filename,mimetype);
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setErrorMsg('Error while downloading file. Try again later');
            }
        }
    };
    const downloadSolutionFile = async (id, mimetype,path) => {
        try {
            console.log(id,mimetype,path);
            const result = await axios.get(`${API_URL}/submission/downloadsubmission/${id}`, {
                responseType: 'blob'
            });
            const split = path.split('/');
            const filename = split[split.length - 1];
            setErrorMsg('');
            return download(result.data,filename,mimetype);
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setErrorMsg('Error while downloading file. Try again later');
            }
        }
    };


    const handleFileChange = ({target})=>{
        setFiles(target.files[0]);
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();
        const formdata = new FormData();
        formdata.append("assignid", aid);
        formdata.append("file", files);
        formdata.append("subdate" , todaydate);
        formdata.append("subtime" , todaytime);
        formdata.append("rollno" , userInfo.rollno);
        formdata.append("comment",comment);


        console.log(formdata);
        await Axios.post(`/submission/uploadsubmission/${aid}`, formdata )
            .then((res)=>dispatch(getAssignmentSubmission(linkedlist)))
            .catch((error)=>console.error(error));
        setAnchorEl(null);
        //props.history.push(`/${linkedlist}/StudentAssignments`);
    }

    useEffect(() => {
        dispatch(getAssignmentSubmission(linkedlist));
    }, [dispatch]);

    const forid = (id)=>{
        console.log(id);
    }

    return <Container maxWidth="lg">
        <Grid item md={12} sm={12} xs={12} className={classes.grid}>
            {loading ? (
                <Loading></Loading>
            ) : error ? (
                <AlertMessage type="error">{error}</AlertMessage>
            ) : ( assignsubmissionarray.length === 0
                ? (<AlertMessage type="info">There are no Assignments.</AlertMessage>)
                : assignsubmissionarray.map((ass)=> {
                    return (
            <Card key={ass._id} className={classes.root} >
                <CardContent>
                    <Assignment fontSize= "large"/> <Typography className={classes.title}>
                        {ass.name}
                    </Typography>
                    <Typography variant="subtitle1" style={{color:"purple"}}>
                        {ass.comment}
                    </Typography><br></br>
                    <Typography variant="subtitle1" >
                        Given: {ass.date + ", " + ass.time}
                    </Typography>

                    <Typography variant="subtitle1" component="h4">
                        Deadline: {ass.deadlinedate + ", " + ass.deadlinetime}
                    </Typography>
                    {(ass.submission && ass.submission.length > 0)
                    ?<div className={classes.sub}>
                        <Typography>Submitted: {ass.submission[0].subdate + ", " + ass.submission[0].subtime}</Typography>
                        {(ass.submission[0].marks)? <Typography> Marks: {ass.submission[0].marks}</Typography> : <> </>}
                        <Typography style={{color:"#6A3311"}}>{ass.submission[0].comment}</Typography>
                    </div>
                    :<> </>
                    }
                </CardContent>
                <CardActions>
                    <Grid>
                        <GetApp fontSize= "large" className= {classes.add}/>
                        <Button size="small" onClick={() => downloadFile(ass._id,ass.file_mimetype,ass.file_path)}>
                            Assignment
                        </Button>
                    </Grid>
                    {(ass.submission && ass.submission.length > 0)
                    ? <><Grid>
                        <GetApp fontSize= "large" className= {classes.add}/>
                        <Button size="small" onClick={() => downloadSolutionFile(ass.submission[0]._id,ass.submission[0].file_mimetype,ass.submission[0].file_path)}>
                            Solution
                        </Button>
                    </Grid><p><strong style={{color:'green'}}>Submitted</strong></p></>
                   : (( Date.parse(ass.deadlinedate + "T" + ass.deadlinetime) >= Date.parse(todaydate + "T" + todaytime))
                   ?<><Grid>
                        <Publish fontSize= "large" className= {classes.add}/>
                        <Button size="small"  onClick={popoverClick} onMouseOver={()=>setAid(ass._id)}>Solution </Button>
                        <Popover         id={id}
                                         open={open}
                                         anchorEl={anchorEl}
                                         onClose={popoverClose}
                                        anchorOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'left',
                                          }}
                                          transformOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'left',
                                          }}

                                         >
                            <Button fullWidth >
                                <input onChange={handleFileChange}
                                       type="file"
                                />
                            </Button>
                            <TextField name="comment" label="Comment"  fullWidth onChange={(e)=>setComment(e.target.value)} multiline/>
                            <Button className={classes.submitbutton} onClick={handleSubmit}>
                                Submit
                            </Button>
                        </Popover>
                    </Grid><p><strong style={{color:'blue'}}>Yet to Submit</strong></p></>
                    :<><Grid>
                        <Publish fontSize= "large" className= {classes.add}/>
                        <Button size="small"  onClick={popoverClick} onMouseOver={()=>setAid(ass._id)} disabled>Solution </Button>
                        <Popover         id={id}
                                        open={open}
                                        anchorEl={anchorEl}
                                        onClose={popoverClose}
                                        anchorOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'left',
                                        }}
                                        transformOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'left',
                                        }}

                                        >
                            <Button fullWidth >
                                <input onChange={handleFileChange}
                                    type="file"
                                />
                            </Button>
                            <Button className={classes.submitbutton} onClick={handleSubmit}>
                                Submit
                            </Button>
                        </Popover>
                    </Grid><p><strong style={{color:'red'}}>Deadline has Passed</strong></p></>
                    )
                }
                </CardActions>
            </Card>
                    )}))}
        </Grid>
    </Container>
}
