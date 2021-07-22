import {
  RECEIVE_QUESTIONS,
  RECEIVE_QUESTION,
  REMOVE_QUESTION
} from '../../actions/question_actions'

const questionsReducer = (state = {}, action) => {
  Object.freeze(state);
  let newState = Object.assign({}, state);

  switch(action.type) {
    case RECEIVE_QUESTIONS:
      // newState = action.questions.data
      newState = Object.assign({}, state, action.questions);
      return newState;
    case RECEIVE_QUESTION:
      debugger
      newState = { data: state.data.filter(question => question._id !== action.question.data._id) };
      newState.data = newState.data.concat(action.question.data);
      // newState[action.question.id] = action.question
      return newState;
    case REMOVE_QUESTION:
      newState = { data: state.data.filter(question => question._id !== action.questionId) };
      return newState;
    default:
      return state;
  }
};

export default questionsReducer;