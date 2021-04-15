import Axios from 'axios';
import {
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
} from '../constants/userConstants';

export const login = (email, password, type) => async (dispatch) => {
    dispatch({ type: USER_LOGIN_REQUEST, payload: { email, password, type } });
    try {
        const { data } = await Axios.post('/auth/signin', { email, password , type});
        dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
        localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};
export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('coursearray');
    dispatch({ type: USER_LOGOUT });
    document.location.href = '/';
};
