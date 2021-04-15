import {COURSE_LIST_REQUEST, COURSE_LIST_SUCCESS, COURSE_LIST_FAIL,ADD_COURSE_REQUEST,ADD_COURSE_SUCCESS,ADD_COURSE_FAIL} from "../constants/courseConstants";

export const  courseReducers = (state = {loading : true, coursearrray : []}, action) => {
    switch (action.type) {
        case COURSE_LIST_REQUEST:
            return { loading: true };
        case COURSE_LIST_SUCCESS:
            return { loading: false, coursearray: action.payload };
        case COURSE_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const  addcourseReducers = (state = {}, action) => {
    switch (action.type) {
        case ADD_COURSE_REQUEST:
            return { loading: true };
        case ADD_COURSE_SUCCESS:
            return { loading: false, newcourse: action.payload };
        case ADD_COURSE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

