import Axios from 'axios';
import {
    COURSE_LIST_REQUEST,
    COURSE_LIST_SUCCESS,
    COURSE_LIST_FAIL, ADD_COURSE_SUCCESS, ADD_COURSE_REQUEST, ADD_COURSE_FAIL,
} from '../constants/courseConstants';

export const courses = () => async (dispatch,getState) => {
    const {
        userLogin: { userInfo },
    } = getState();
    dispatch({ type: COURSE_LIST_REQUEST });
    try {
        const { data } = await Axios.post(`/courses/${userInfo._id}`,{type : (userInfo.type)} );
        dispatch({ type: COURSE_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: COURSE_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const addcourse = (newcourse) => async (dispatch,getState) => {
    const {
        userLogin: { userInfo },
    } = getState();
    dispatch({ type: ADD_COURSE_REQUEST });
    try {
        const { data } = await Axios.post(`/admin/addcourse/${userInfo._id}`,newcourse);
        dispatch({ type: ADD_COURSE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: ADD_COURSE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};


