import {SUBMISSION_LIST_REQUEST, SUBMISSION_LIST_SUCCESS, SUBMISSION_LIST_FAILURE} from "../constants/submissionConstants";

export const  submissionReducers = (state = {loading : true, submissionarray : []}, action) => {
    switch (action.type) {
        case SUBMISSION_LIST_REQUEST:
            return { loading: true };
        case SUBMISSION_LIST_SUCCESS:
            return { loading: false, submissionarray: action.payload };
        case SUBMISSION_LIST_FAILURE:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};
