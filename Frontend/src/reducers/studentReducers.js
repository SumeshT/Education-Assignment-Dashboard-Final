import {STUDENT_LIST_REQUEST, STUDENT_LIST_SUCCESS, STUDENT_LIST_FAIL} from "../constants/studentConstants";

export const  studentReducers = (state = {loading : true, studentarray : []}, action) => {
    switch (action.type) {
        case STUDENT_LIST_REQUEST:
            return { loading: true };
        case STUDENT_LIST_SUCCESS:
            return { loading: false, studentarray: action.payload };
        case STUDENT_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};
