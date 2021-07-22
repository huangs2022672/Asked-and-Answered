import * as UserAPIUtil from '../util/user_api_util';


export const RECEIVE_ALL_USERS = "RECEIVE_ALL_USERS";
export const RECEIVE_USERS_ERRORS = "RECEIVE_USERS_ERRORS";
export const REMOVE_USERS_ERRORS = "REMOVE_USERS_ERRORS";

export const receiveAllUsers = (users) => ({
    type: RECEIVE_ALL_USERS,
    users
});

export const receiveErrors = errors => ({
    type: RECEIVE_USERS_ERRORS,
    errors
});

export const removeErrors = () => ({
    type: REMOVE_USERS_ERRORS,
});

export const fetchAllUsers = () => dispatch => {
    return (
        UserAPIUtil.fetchAllUsers()
            .then(users => dispatch(receiveAllUsers(users)))
            .catch(err => dispatch(receiveErrors(err)))
    )
}