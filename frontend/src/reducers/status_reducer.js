import { QUESTION_SHOW_STATUS } from "../actions/question_actions";

const statusReducer = (state = {}, action) => {
  Object.freeze(state)
  let newState = Object.assign({}, state)

  
  switch(action.type) {
    case QUESTION_SHOW_STATUS:
      if (state.questionShow) {
        newState = { questionShow: false  }
      } else {
        newState = { questionShow: true, questionId: action.questionId}
      }
      return newState
    default:
      return state
  }
}

export default statusReducer;