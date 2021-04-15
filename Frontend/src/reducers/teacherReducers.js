import {TEACHER_LIST_REQUEST, TEACHER_LIST_SUCCESS, TEACHER_LIST_FAIL} from "../constants/teacherConstants";

export const  teacherReducers = (state = {loading : true, teacherarray : []}, action) => {
    switch (action.type) {
        case TEACHER_LIST_REQUEST:
            return { loading: true };
        case TEACHER_LIST_SUCCESS:
            return { loading: false, teacherarray: action.payload };
        case TEACHER_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};
