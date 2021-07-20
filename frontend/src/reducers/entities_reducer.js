import { combineReducers } from 'redux';
import QuestionReducer from './question/questions_reducer';

export default combineReducers({
    question: QuestionReducer,
});