import { connect } from 'react-redux';
import QuestionsIndex from './questions_index';
import {fetchUnassigned, fetchUserQuestions, fetchResolved, fetchPending} from '../../actions/question_actions';
import { fetchUsers } from '../../actions/session_actions';
import {fetchAnswers, fetchAnswer, createAnswer, updateAnswer, deleteAnswer} from '../../actions/answer_actions';


const mapStateToProps = (state) => {
    return {
        questions: state.entities.questions.data,
        current_user: state.session.user,
        users: state.entities.users
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchUnassigned: () => dispatch(fetchUnassigned()),
        fetchUserQuestions: userId => dispatch(fetchUserQuestions(userId)),
        fetchResolved: () => dispatch(fetchResolved()),
        fetchPending: () => dispatch(fetchPending()),
        fetchUsers: () => dispatch(fetchUsers()),
        fetchAnswers:(questionId)=> dispatch(fetchAnswers(questionId))
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(QuestionsIndex);