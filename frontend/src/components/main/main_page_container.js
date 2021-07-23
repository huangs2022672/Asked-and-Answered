import { connect } from 'react-redux';
import MainPage from './main_page';
import {
    createQuestion
} from '../../actions/question_actions';
import {logout} from '../../actions/session_actions';

const mapStateToProps = state => ({
    loggedIn: state.session.isAuthenticated,
    session: state.session
});

const mapDispatchToProps = (dispatch) => {
    return {
        
        createQuestion: question => dispatch(createQuestion(question)),
        logout: () => dispatch(logout())
        
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);