import {
  RECEIVE_QUESTIONS,
  RECEIVE_QUESTION,
  REMOVE_QUESTION
} from '../../actions/question_actions'

const questionsReducer = (state = {}, action) => {
  Object.freeze(state)
  const newState = Object.assign({}, state)

  switch(action.type) {
    case RECEIVE_QUESTIONS:
      newState = Object.assign({}, state, action.questions)
      return newState;
    case RECEIVE_QUESTION:
      newState[action.question.id] = action.question
      return newState;
    case REMOVE_QUESTION:
      delete newState[action.questionId]
      return newState
    default:
      return state;
  }
}

export default questionsReducer;