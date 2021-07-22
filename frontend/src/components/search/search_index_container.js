// import { connect } from 'react-redux';
// import SearchIndexItem from './search_index_item';
// import {fetchAllQuestions} from '../../actions/question_actions';

// const mapStateToProps = (state) => {
//     return {
//         current_user: state.session.user,
//         questionShowStatus: state.status.questionShow,
//     };
// };

// const mapDispatchToProps = (dispatch) => {
//     return {
//         deleteQuestion: questionId => dispatch(deleteQuestion(questionId)),
//         updateQuestion: question => dispatch(updateQuestion(question)),
//         updateAssignment: questionId => dispatch(updateAssignment(questionId)),
//         updateResolvedStatus: questionId => dispatch(updateResolvedStatus(questionId)),
//         questionShowStatus: () => dispatch(questionShowStatus()),
//         fetchUnassigned: () => dispatch(fetchUnassigned()),
//         fetchPending: () => dispatch(fetchPending()),
//         fetchResolved: () => dispatch(fetchResolved()),
//         fetchUserQuestions: userId => dispatch(fetchUserQuestions(userId))

//     };
// }

// export default connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(QuestionsIndexItem);