import { connect } from 'react-redux';
import QuestionsIndexItem from './questions_index_item';
import {
  deleteQuestion, 
  updateQuestion, 
  updateAssignment, 
  updateResolvedStatus,
  questionShowStatus,
  fetchUnassigned,
  fetchPending,
  fetchResolved,
  fetchUserQuestions
} from '../../actions/question_actions';

const mapStateToProps = (state) => {
    return {
        current_user: state.session.user,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        deleteQuestion: questionId => dispatch(deleteQuestion(questionId)),
        updateQuestion: question => dispatch(updateQuestion(question)),
        updateAssignment: questionId => dispatch(updateAssignment(questionId)),
        updateResolvedStatus: questionId => dispatch(updateResolvedStatus(questionId)),
        questionShowStatus: (questionId) => dispatch(questionShowStatus(questionId)),
        fetchUnassigned: () => dispatch(fetchUnassigned()),
        fetchPending: () => dispatch(fetchPending()),
        fetchResolved: () => dispatch(fetchResolved()),
        fetchUserQuestions: userId => dispatch(fetchUserQuestions(userId))
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(QuestionsIndexItem);