import React,{useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import {useDispatch, useSelector} from "react-redux";
import Loading from "./Loading";
import AlertMessage from "./alertMessage";
import {student} from "../actions/studentAction";

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
    items: [{ columnField: 'semester', operatorValue: 'contains', value: '' }],
};

export default function ViewStudents(props) {
    const allStudents = useSelector((state) => state.studentarray);
    const {loading,error,studentarray} = allStudents;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(student());
    }, [dispatch,props]);

    const classes = useStyles();

    const columns = [
        { field: 'id', headerName: 'ID', width: 200 },
        { field: 'semester', headerName: 'Semester', width: 200 },
        { field: 'name', headerName: 'Name', width: 270 },
        { field: 'email', headerName: 'Email', width: 270 },
        { field: 'branch', headerName: 'Branch', width: 200 },
        { field: 'degree', headerName: 'Degree', width: 200 },
        { field: 'batch', headerName: 'Batch', width: 200 },
        { field: 'rollno', headerName: 'RollNo', width: 200 },
    ];

    if(studentarray){
        for(let i=0;i<studentarray.length;i++){
            studentarray[i].id = i+1;
        }
    }

    return <div style={{ height: 400, width: '100%' }}>
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
}
