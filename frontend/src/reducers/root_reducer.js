import { combineReducers } from "redux";
import sessionReducer from "./session/session_api_reducer";
import errorsReducer from "./errors_reducer";
import entitiesReducer from './entities_reducer';
import statusReducer from "./status_reducer";

const rootReducer = combineReducers({
    session: sessionReducer,
    errors: errorsReducer,
    entities: entitiesReducer,
    status: statusReducer
});

export default rootReducer