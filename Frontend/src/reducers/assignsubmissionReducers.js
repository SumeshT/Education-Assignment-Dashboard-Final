import {ASSIGNMENT_LIST_REQUEST, ASSIGNMENT_LIST_SUCCESS, ASSIGNMENT_LIST_FAILURE} from "../constants/assignmentConstants";

export const  assignsubmissionReducers = (state = {loading : true, assignsubmissionarray : []}, action) => {
    switch (action.type) {
        case ASSIGNMENT_LIST_REQUEST:
            return { loading: true };
        case ASSIGNMENT_LIST_SUCCESS:
            return { loading: false, assignsubmissionarray : action.payload};
        case ASSIGNMENT_LIST_FAILURE:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};
