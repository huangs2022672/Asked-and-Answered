import { connect } from 'react-redux';
import QuestionsIndex from './questions_index';
import {fetchUnassigned, fetchUserQuestions, fetchResolved, fetchPending, createQuestion, deleteQuestion} from '../../actions/question_actions';


const mapStateToProps = (state) => {
    debugger
    return {
        questions: state.entities.questions.data,
        current_user: state.session.user
    };
};

const mapDispatchToProps = (dispatch) => {
    // debugger
    return {
        fetchUnassigned: () => dispatch(fetchUnassigned()),
        fetchUserQuestions: userId => dispatch(fetchUserQuestions(userId)),
        fetchResolved: () => dispatch(fetchResolved()),
        fetchPending: () => dispatch(fetchPending()),
        createQuestion: question => dispatch(createQuestion(question)),
        deleteQuestion: questionId => dispatch(deleteQuestion(questionId))
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(QuestionsIndex);