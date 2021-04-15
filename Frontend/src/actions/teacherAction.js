import Axios from 'axios';
import {
    TEACHER_LIST_REQUEST,
    TEACHER_LIST_SUCCESS,
    TEACHER_LIST_FAIL,
} from '../constants/teacherConstants';

export const teacher = () => async (dispatch) => {
    dispatch({ type: TEACHER_LIST_REQUEST });
    try {
        const { data } = await Axios.get('/teacher/allteachers');
        dispatch({ type: TEACHER_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: TEACHER_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};
