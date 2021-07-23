import { connect } from 'react-redux';
import SearchIndexItem from './search_index_item';
import {fetchAllQuestions} from '../../actions/question_actions';

const mapStateToProps = (state, ownprops) => {
    debugger
    return {
        users: state.entities.users,
        questions: state.entities.questions.data,
        current_user: state.session.user
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
      fetchAllQuestions: () => dispatch(fetchAllQuestions())
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchIndexItem);