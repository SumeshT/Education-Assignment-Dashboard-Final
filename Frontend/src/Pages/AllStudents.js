import React,{useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from "@material-ui/core/Grid";
import {Add} from "@material-ui/icons";
import {Link} from "react-router-dom";
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import { useDemoData } from '@material-ui/x-grid-data-generator';
import {useDispatch, useSelector} from "react-redux";
import {coursestudent, student} from "../actions/studentAction";
import Loading from "./Loading";
import AlertMessage from "./alertMessage";

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 350,
        marginBottom:'30px'
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

const studentFilterModel = {
    items: [{ columnField: 'commodity', operatorValue: 'contains', value: 'rice' }],
};

export default function AllStudents(props) {
    const allStudents = useSelector((state) => state.studentarray);
    const {loading,error,studentarray} = allStudents;
    const dispatch = useDispatch();
    const linkedlist = props.match.params.courseid;
    useEffect(() => {
        dispatch(coursestudent(linkedlist));
    }, [dispatch]);
    const classes = useStyles();
    const columns = [
        { field: 'id', headerName: 'ID', width: 200 },
        { field: 'semester', headerName: 'Semester', width: 200 },
        { field: 'name', headerName: 'Name', width: 270 },
        { field: 'email', headerName: 'Email', width: 270 },
        { field: 'branch', headerName: 'Branch', width: 200 },
        { field: 'degree', headerName: 'Degree', width: 200 },
        { field: 'batch', headerName: 'Batch', width: 200 },
    ];

    if(studentarray){
        for(let i=0;i<studentarray.length;i++){
            studentarray[i].id = i+1;
        }
    }

    return <div>
        <Grid item md={2} sm={6} xs={12} className={classes.newassignment}>
            <Add className={classes.add} fontSize="large"/>
            <Button variant="contained" size="large" color="primary"
                    className={classes.margin}>
                <Link to={`/course/${linkedlist}/AddStudents`} style={{color: 'white'}}>
                    Add Students
                </Link></Button>
        </Grid>
        <div style={{ height: 400, width: '100%' }}>
            {loading ? (
                <Loading></Loading>
            ) : error ? (
                <AlertMessage type="error">{error}</AlertMessage>
            ) : ( studentarray.length === 0
                    ? (<AlertMessage type="info">There are no Students.</AlertMessage>)
                    : (<DataGrid
                        rows={studentarray} columns={columns}
                        filterModel={studentFilterModel}
                        components={{
                            Toolbar: GridToolbar,
                        }}
                    />)
            )}
        </div>
    </div>
}
