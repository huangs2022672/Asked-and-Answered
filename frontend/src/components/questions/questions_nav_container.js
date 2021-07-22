import { connect } from 'react-redux';
import QuestionsNav from './questions_nav';
import {
  deleteQuestion, 
} from '../../actions/question_actions';

const mapStateToProps = (state) => {
    return {

    };
};

const mapDispatchToProps = (dispatch) => {
    return {

    };
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionsNav);