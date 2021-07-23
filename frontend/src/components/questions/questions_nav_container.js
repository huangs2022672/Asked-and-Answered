import { connect } from 'react-redux';
import QuestionsNav from './questions_nav';
import {
  logout
} from '../../actions/session_actions';

const mapStateToProps = (state) => {
    return {
      currentUser: state.session.user
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
      logout: () => dispatch(logout())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionsNav);