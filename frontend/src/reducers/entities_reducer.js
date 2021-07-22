import { combineReducers } from 'redux';
import answersReducer from './answer/answers_reducer';
import questionsReducer from './question/questions_reducer';
import usersReducer from './user/users_reducer'

export default combineReducers({
    questions: questionsReducer,
    answers: answersReducer,
    users: usersReducer
});