import Axios from 'axios';
import {
    ASSIGNMENT_LIST_REQUEST,
    ASSIGNMENT_LIST_SUCCESS,
    ASSIGNMENT_LIST_FAILURE,
} from '../constants/assignmentConstants';

export const getAssignment = (courseid) => async (dispatch) => {
    dispatch({ type: ASSIGNMENT_LIST_REQUEST });
    try {
        const { data } = await Axios.get(`/assignment/allassignment/${courseid}`);
        dispatch({ type: ASSIGNMENT_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: ASSIGNMENT_LIST_FAILURE,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};
