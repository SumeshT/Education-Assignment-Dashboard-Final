import { userLoginReducer } from './reducers/userReducers';
import {addcourseReducers, courseReducers} from './reducers/courseReducers'
import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunk from 'redux-thunk';
import {teacherReducers} from "./reducers/teacherReducers";
import {studentReducers} from "./reducers/studentReducers";
import {assignmentReducers} from "./reducers/assignmentReducers";
import {assignsubmissionReducers} from "./reducers/assignsubmissionReducers";
import {submissionReducers} from "./reducers/submissionReducers";

const initialState = {userLogin: {
        userInfo: localStorage.getItem('userInfo')
            ? JSON.parse(localStorage.getItem('userInfo'))
            : null,
    }, };
const reducer = combineReducers({
    userLogin : userLoginReducer,
    coursearray : courseReducers,
    teacherarray  : teacherReducers,
    newcourse : addcourseReducers,
    studentarray : studentReducers,
    assignmentarray : assignmentReducers,
    assignsubmissionarray  : assignsubmissionReducers,
    submissionarray : submissionReducers,
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer , initialState ,composeEnhancer(applyMiddleware(thunk)));


export default store;
