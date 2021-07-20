import { combineReducers } from 'redux';
import SessionErrorsReducer from './session/session_errors_reducer';
import QuestionErrorsReducer from './question/question_errors_reducer';

export default combineReducers({
    session: SessionErrorsReducer,
    question: QuestionErrorsReducer
});