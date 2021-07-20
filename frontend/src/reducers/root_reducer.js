import { combineReducers } from "redux";
import errors_reducer from "./errors_reducer";
import session_api_reducer from "./session/session_api_reducer";

const rootReducer = combineReducers({
    session: session_api_reducer,
    errors: errors_reducer
});

export default rootReducer