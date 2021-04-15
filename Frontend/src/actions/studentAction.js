import Axios from 'axios';
import {
    STUDENT_LIST_REQUEST,
    STUDENT_LIST_SUCCESS,
    STUDENT_LIST_FAIL,
    ADD_COURSE_STUDENT_REQUEST,
    ADD_COURSE_STUDENT_SUCCESS,
    ADD_COURSE_STUDENT_FAIL
} from '../constants/studentConstants';

export const student = () => async (dispatch) => {
    dispatch({ type: STUDENT_LIST_REQUEST });
    try {
        const { data } = await Axios.get('/student/allstudents');
        dispatch({ type: STUDENT_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: STUDENT_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const coursestudent = (courseid) => async (dispatch) => {
    dispatch({ type: STUDENT_LIST_REQUEST });
    try {
        const { data } = await Axios.get(`/student/coursestudents/${courseid}`);
        dispatch({ type: STUDENT_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: STUDENT_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const semesterstudent = (semester) => async (dispatch) => {
    dispatch({ type: STUDENT_LIST_REQUEST });
    try {
        const { data } = await Axios.get(`/student/semesterstudents/${semester}`);
        dispatch({ type: STUDENT_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: STUDENT_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const addCourseStudent = (studentlist,courseid) => async (dispatch) => {
    dispatch({ type: ADD_COURSE_STUDENT_REQUEST });
    try {
        const { datae } = await Axios.put(`/student/addcoursestudent/${courseid}`, studentlist);
        dispatch({ type: ADD_COURSE_STUDENT_SUCCESS, payload: datae });
        const { data } = await Axios.get(`/student/coursestudents/${courseid}`);
        dispatch({ type: STUDENT_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: ADD_COURSE_STUDENT_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};
