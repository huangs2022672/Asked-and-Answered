import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Route, Switch } from 'react-router';

import MainPageContainer from './main/main_page_container';
import LoginFormContainer from './session/login_form_container';
import SignupFormContainer from './session/signup_form_container';
import QuestionsIndexContainer from './questions/questions_index_container'
import SearchIndexContainer from './search/search_index_container'

const App = () => (
    <div>
        {/* <NavBarContainer /> */}
        <Switch>
            <Route exact path="/" component={MainPageContainer} />
            <AuthRoute exact path="/login-student" component={LoginFormContainer} />
            <AuthRoute exact path="/login-instructor" component={LoginFormContainer} />
            <AuthRoute exact path="/signup" component={SignupFormContainer} />
            <ProtectedRoute exact path="/questions" component={QuestionsIndexContainer}/>
            <ProtectedRoute exact path="/questions/search/:query" component={SearchIndexContainer}/>
        
        </Switch>
    </div>
);

export default App;