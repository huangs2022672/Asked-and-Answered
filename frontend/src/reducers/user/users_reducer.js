import { RECEIVE_ALL_USERS, RECEIVE_USERS_ERRORS, REMOVE_USERS_ERRORS } from "../../actions/user_actions";

const usersReducer = (state = {}, action) => {
  Object.freeze(state)
  let newState = Object.assign({}, state)

  switch(action.type) {
    case RECEIVE_ALL_USERS:
        newState = Object.assign({}, state, action.users)
        return newState;
    default:
      return state
  }
}

export default usersReducer;
