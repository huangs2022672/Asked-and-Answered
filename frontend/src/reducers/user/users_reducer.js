import { RECEIVE_USERS } from "../../actions/session_actions";

export default function(state = {}, action) {
    switch (action.type) {
    case RECEIVE_USERS:
        return action.users
    default:
        return state;
    }
}