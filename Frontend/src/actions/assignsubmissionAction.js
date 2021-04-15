import Axios from 'axios';
import {
    ASSIGNMENT_LIST_REQUEST,
    ASSIGNMENT_LIST_SUCCESS,
    ASSIGNMENT_LIST_FAILURE,
} from '../constants/assignsubmissionConstants';

export const getAssignmentSubmission = (courseid) => async (dispatch,getState) => {
    const {
        userLogin: { userInfo },
    } = getState();
    dispatch({ type: ASSIGNMENT_LIST_REQUEST });
    try {
        const { data } = await Axios.get(`/submission/allsubmission/${courseid}/${userInfo.rollno}`);
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
