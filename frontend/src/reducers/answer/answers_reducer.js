import { RECEIVE_ANSWERS, RECEIVE_ANSWER, REMOVE_ANSWER } from "../../actions/answer_actions"

const answersReducer = (state = {}, action) => {
    Object.freeze(state)
    let newState = Object.assign({}, state)

    debugger
    switch(action.type) {
        case RECEIVE_ANSWERS:
            return action.answers;
        case RECEIVE_ANSWER:
            newState = { data: newState.data.concat(action.answer.data) }
            return newState 
        case REMOVE_ANSWER:
            delete newState[action.answerId]
            return newState
        default:
            return state;
    }
}

export default answersReducer;