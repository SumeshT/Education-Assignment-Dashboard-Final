import React,{useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";
import {IconButton} from "@material-ui/core";
import {Add, Assignment, Edit, Launch, Publish, GetApp} from "@material-ui/icons";
import {Link} from "react-router-dom";
import Container from "@material-ui/core/Container";
import {useDispatch, useSelector} from "react-redux";
import {coursestudent} from "../actions/studentAction";
import {getAssignment} from "../actions/assignmentAction";
import Loading from "./Loading";
import AlertMessage from "./alertMessage";
import download from 'downloadjs';
import axios from "axios";
import { API_URL } from '../utils/constants';

const useStyles = makeStyles((theme) => ({
    root: {
        marginBottom:'30px',
    },
    title: {
        fontSize: 20,
        paddingBottom : '15px'

    },
    margin: {
        margin: theme.spacing(1),
        marginTop:'5px',
    },
    newassignment :{
        paddingBottom :'10px',
        margin : theme.spacing(2),
    },
    add : {
        verticalAlign : "middle"
    }
}));
export default function TeacherAssignments(props){
    const classes = useStyles();

    const allAssignments = useSelector((state) => state.assignmentarray);
    const {loading,error,assignmentarray} = allAssignments;
    const dispatch = useDispatch();
    const linkedlist = props.match.params.courseid;
    useEffect(() => {
        dispatch(getAssignment(linkedlist));
    }, [dispatch]);

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

    return <div>
        <Grid item md={2} sm={6} xs={12} className={classes.newassignment}>
                <Add className={classes.add} fontSize="large"/>
                <Button variant="contained" size="large" color="primary"
                        className={classes.margin}>
                    <Link to = {`/${linkedlist}/addAssignment`} style = {{color : 'white'}}>
                        New Assignment
                    </Link></Button>
        </Grid>
        <Container maxWidth="lg">
        <Grid item md={12} sm={12} xs={12} >
            {loading ? (
                <Loading></Loading>
            ) : error ? (
                <AlertMessage type="error">{error}</AlertMessage>
            ) : ( assignmentarray.length === 0
                ? (<AlertMessage type="info">There are no Assignments.</AlertMessage>)
                : assignmentarray.map((ass)=> {
                     return (<Card className={classes.root}>
                        <CardContent>
                            <Assignment fontSize="large"/>
                            <Typography className={classes.title}>
                                {ass.name}
                            </Typography>
                            <Typography variant="subtitle1" >
                        {ass.comment}
                    </Typography><br></br>
                            <Typography variant="subtitle1">
                                Given: {ass.date + ", " + ass.time}
                            </Typography>
                            <Typography variant="subtitle1" component="h4">
                                Deadline : {ass.deadlinedate + ", " + ass.deadlinetime}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            {/*<Grid>*/}
                            {/*    <Edit fontSize= "large" className= {classes.add}/>*/}
                            {/*    <Button size="large">Edit</Button>*/}
                            {/*</Grid>*/}
                            
                            <Grid>
                                <GetApp fontSize= "large" className= {classes.add}/>
                                <Button size="small" onClick={() => downloadFile(ass._id,ass.file_mimetype,ass.file_path)}>
                                    Download
                                </Button>
                            </Grid>
                            <Grid>
                                <Launch fontSize="large" className={classes.add}/>
                                <Button size="large">
                                    <Link to={`/${ass._id}/AssignmentStatus`}>Open
                                    </Link>
                                </Button>
                            </Grid>
                        </CardActions>
                    </Card>
                     )}))}
        </Grid>
        </Container>
    </div>
}
