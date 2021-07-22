import AnswersIndex from './answers_index';
import {fetchAnswers, fetchAnswer, createAnswer, updateAnswer, deleteAnswer} from '../../actions/answer_actions';
import {connect} from 'react-redux';

const mSTP =(state) => ({
    answers: Object.values(state.entities.answers),
    question: state.entities.questions.data.filter(question => question._id === state.status.questionId)
});

const mDTP = (dispatch) => (
{
fetchAnswers:(questionId)=> dispatch(fetchAnswers(questionId)),
fetchAnswer:(questionId,answerId)=> dispatch(fetchAnswer(questionId, answerId)),

createAnswer:(questionId,answer)=> dispatch(createAnswer(questionId,answer)),
updateAnswer:(questionId,answer) => dispatch(updateAnswer(questionId,answer)),
deleteAnswer:(questionId, answerId) => dispatch(deleteAnswer(questionId,answerId))

});

export default connect(mSTP, mDTP)(AnswersIndex);