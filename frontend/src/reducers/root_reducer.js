import { combineReducers } from "redux";
import session_reducer from "./session/session_reducer";
import errors_reducer from "./errors_reducer";
import EntitiesReducer from './entities_reducer';

const rootReducer = combineReducers({
    session: session_reducer,
    errors: errors_reducer,
    entities: EntitiesReducer,
});

export default rootReducer