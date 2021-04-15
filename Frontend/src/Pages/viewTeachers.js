import React,{useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import {useDispatch, useSelector} from "react-redux";
import {teacher} from "../actions/teacherAction";
import Loading from "./Loading";
import AlertMessage from "./alertMessage";

const useStyles = makeStyles((theme) => ({

}));

const teacherFilterModel = {
    items: [{ columnField: 'branch', operatorValue: 'contains', value: '' }],
};

export default function ViewTeachers(props) {

    const allTeachers = useSelector((state) => state.teacherarray);
    const {loading,error,teacherarray} = allTeachers;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(teacher());
    }, [dispatch]);

    const columns = [
        { field: 'id', headerName: 'ID', width: 200 },
        { field: 'teacherid', headerName: 'TID', width: 200 },
        { field: 'name', headerName: 'Name', width: 270 },
        { field: 'email', headerName: 'Email', width: 270 },
        { field: 'branch', headerName: 'Branch', width: 200 },
    ];

    if(teacherarray){
        for(let i=0;i<teacherarray.length;i++){
            teacherarray[i].id = i+1;
        }
    }

    const classes = useStyles();
    return <div style={{ height: 400, width: '100%' }}>
        {loading ? (
                    <Loading></Loading>
                ) : error ? (
                    <AlertMessage type="error">{error}</AlertMessage>
                ) : ( teacherarray.length === 0
        ? (<AlertMessage type="info">There are no Teachers.</AlertMessage>)
            : (<DataGrid
                rows={teacherarray} columns={columns}
                filterModel={teacherFilterModel}
                components={{
                    Toolbar: GridToolbar,
                }}
            />)
        )}
    </div>
}
