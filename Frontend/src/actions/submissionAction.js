import Axios from 'axios';
import {
    SUBMISSION_LIST_REQUEST,
    SUBMISSION_LIST_SUCCESS,
    SUBMISSION_LIST_FAILURE,
} from '../constants/submissionConstants';

export const getSubmission = (assignid) => async (dispatch) => {
    dispatch({ type: SUBMISSION_LIST_REQUEST });
    try {
        const { data } = await Axios.get(`/submission/allstudentsubmission/${assignid}`);
        dispatch({ type: SUBMISSION_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: SUBMISSION_LIST_FAILURE,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

