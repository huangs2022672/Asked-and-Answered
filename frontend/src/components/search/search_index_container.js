import { connect } from 'react-redux';
import SearchIndexItem from './search_index_item';
import {fetchAllQuestions} from '../../actions/question_actions';
import { questionShowStatus } from '../../actions/question_actions';

const mapStateToProps = (state) => {
    debugger
    return {
        users: state.entities.users,
        questions: state.entities.questions.data,
        current_user: state.session.user,
        questionShow: state.status.questionShow,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllQuestions: () => dispatch(fetchAllQuestions()),
        questionShowStatus: () => dispatch(questionShowStatus()),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchIndexItem);