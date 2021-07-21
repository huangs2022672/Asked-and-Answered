import { connect } from 'react-redux';
import QuestionsIndex from './questions_index';
import {fetchUnassigned, fetchUserQuestions, fetchResolved, fetchPending, createQuestion, deleteQuestion, updateQuestion, updateAssignment, updateResolvedStatus} from '../../actions/question_actions';


const mapStateToProps = (state) => {
    return {
        questions: state.entities.questions.data,
        current_user: state.session.user
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchUnassigned: () => dispatch(fetchUnassigned()),
        fetchUserQuestions: userId => dispatch(fetchUserQuestions(userId)),
        fetchResolved: () => dispatch(fetchResolved()),
        fetchPending: () => dispatch(fetchPending()),
        createQuestion: question => dispatch(createQuestion(question)),
        deleteQuestion: questionId => dispatch(deleteQuestion(questionId)),
        updateQuestion: question => dispatch(updateQuestion(question)),
        updateAssignment: questionId => dispatch(updateAssignment(questionId)),
        updateResolvedStatus: questionId => dispatch(updateResolvedStatus(questionId))
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(QuestionsIndex);