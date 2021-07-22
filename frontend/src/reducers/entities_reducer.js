import { combineReducers } from 'redux';
import questionsReducer from './question/questions_reducer';
import usersReducer from './user/users_reducer';


export default combineReducers({
    questions: questionsReducer,
    users: usersReducer
});