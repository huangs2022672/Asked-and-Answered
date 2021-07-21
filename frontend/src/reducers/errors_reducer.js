import { combineReducers } from 'redux';
import sessionErrorsReducer from './session/session_errors_reducer';
import questionErrorsReducer from './question/question_errors_reducer';
import answerErrorsReducer from './answer/answer_errors_reducer';

export default combineReducers({
    session: sessionErrorsReducer,
    questions: questionErrorsReducer,
    answers: answerErrorsReducer
});