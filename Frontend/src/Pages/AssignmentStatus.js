import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import {GetApp, Publish} from "@material-ui/icons";
import Button from "@material-ui/core/Button";
import {Paper, TextField} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import {useDispatch, useSelector} from "react-redux";
import {getSubmission} from "../actions/submissionAction";
import axios from "axios";
import {API_URL} from "../utils/constants";
import download from "downloadjs";
import Loading from "./Loading";
import AlertMessage from "./alertMessage";
import Axios from "axios";
import {getAssignmentSubmission} from "../actions/assignsubmissionAction";
import Popover from "@material-ui/core/Popover";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginTop : 10
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    add : {
        verticalAlign : "middle",
    },
    fixheight : {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        height : 32,
    },
    margin : {
        marginTop : 30,
        marginBottom : 30,
    },
    TextField : {
        padding : 10,
    }
}));

export default function AssignmentStatus(props) {
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

    const [marks,setMarks] = useState('');


    const handleSubmit = async (id) => {
        console.log(marks);
        await Axios.post(`/submission/updatemarks/${id}`, {marks:marks} )
            .then((res)=>dispatch(getSubmission(linkedlist)),
                setAnchorEl(null)
            )
            .catch((error)=>console.error(error));
    }

    const [errorMsg, setErrorMsg] = useState('');
    const [comment,setComment] = useState('');
    const downloadFile = async (id, mimetype,path) => {
        try {
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

    const allStudents = useSelector((state) => state.submissionarray);
    const {loading,error,submissionarray} = allStudents;
    const dispatch = useDispatch();
    const linkedlist = props.match.params.assignid;

    useEffect(() => {
        dispatch(getSubmission(linkedlist));
    }, [dispatch]);

    const[subid,setSubid] = useState('');

    return (
        <Container>
        <Grid className={classes.root}>
            <Grid container spacing={1} className={classes.grid}>
                <Grid item xs={6} sm={2}>
                    <Card className={classes.paper}><b>Roll No </b></Card>
                </Grid>
                <Grid item xs={6} sm={2}>
                    <Card className={classes.paper}><b>Marks</b></Card>
                </Grid>
                <Grid item xs={6} sm={4}>
                    <Card className={classes.paper}><b>Comments</b></Card>
                </Grid>
                <Grid item xs={6} sm={2}>
                    <Card className={classes.paper}>
                        <b>Download</b>
                    </Card>
                </Grid>
            </Grid>
        </Grid>
            {loading ? (
                <Loading></Loading>
            ) : error ? (
                <AlertMessage type="error">{error}</AlertMessage>
            ) : ( submissionarray.length === 0
                ? (<AlertMessage type="info">There are no Students.</AlertMessage>)
                : submissionarray.map((subs)=> {
            return (
            <Grid container spacing={2}>
                <Grid item xs={6} sm={2}>
                    <Card className={classes.fixheight}>{subs.rollno}</Card>
                </Grid>
                <Grid item xs={6} sm={2} >
                    <Card className={classes.fixheight}>{subs.marks}</Card>
                </Grid>
                <Grid item xs={6} sm={4} >
                    <Card className={classes.fixheight}>{subs.comment}</Card>
                </Grid>
                <Grid item xs={6} sm={2}>
                    <Card className={classes.fixheight}>
                        <Button onClick={() => downloadFile(subs._id,subs.file_mimetype,subs.file_path)}>
                        <GetApp fontSize= "small" className= {classes.add} />
                        </Button>
                    </Card>
                </Grid>

                <Button variant="contained" size="large" color="primary" className={classes.margin}  onClick={popoverClick} onMouseOver={()=>setSubid(subs._id)}>Add Marks </Button>
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
                    <Button className={classes.TextField} >
                        <TextField id="Marks" value={marks} onChange={(e) => setMarks((e.target.value))}/>
                    </Button>
                    <Button variant="contained" size="large" color="primary"
                            className={classes.margin} onClick={() => handleSubmit(subs._id)} >
                        SUBMIT
                    </Button>
                </Popover>
            </Grid>
            )}))}
        </Container>
    );
}
