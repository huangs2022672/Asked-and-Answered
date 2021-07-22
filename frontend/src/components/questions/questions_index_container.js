import { connect } from 'react-redux';
import QuestionsIndex from './questions_index';
import {
    fetchUnassigned, 
    fetchUserQuestions, 
    fetchResolved, 
    fetchPending, 
    createQuestion, 
} from '../../actions/question_actions';
import {fetchAllUsers} from '../../actions/user_actions'

const mapStateToProps = (state) => {
    return {
        questions: state.entities.questions.data,
        current_user: state.session.user,
        questionShowStatus: state.status.questionShow,
        users: state.entities.users.data
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchUnassigned: () => dispatch(fetchUnassigned()),
        fetchUserQuestions: userId => dispatch(fetchUserQuestions(userId)),
        fetchResolved: () => dispatch(fetchResolved()),
        fetchPending: () => dispatch(fetchPending()),
        createQuestion: question => dispatch(createQuestion(question)),
        fetchAllUsers: users => dispatch(fetchAllUsers(users))
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(QuestionsIndex);