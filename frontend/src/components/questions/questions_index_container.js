import { connect } from 'react-redux';
import QuestionsIndex from './questions_index';
import {
    fetchUnassigned, 
    fetchUserQuestions, 
    fetchResolved, 
    fetchPending, 
    createQuestion 
} from '../../actions/question_actions';

const mapStateToProps = (state) => {
    return {
        questions: state.entities.questions.data,
        current_user: state.session.user,
        questionShowStatus: state.status.questionShow
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchUnassigned: () => dispatch(fetchUnassigned()),
        fetchUserQuestions: userId => dispatch(fetchUserQuestions(userId)),
        fetchResolved: () => dispatch(fetchResolved()),
        fetchPending: () => dispatch(fetchPending()),
        createQuestion: question => dispatch(createQuestion(question)),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(QuestionsIndex);