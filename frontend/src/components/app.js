import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Route, Switch } from 'react-router';
import NavBarContainer from './nav/navbar_container';

import MainPageContainer from './main/main_page_container';
import LoginFormContainer from './session/login_form_container';
import SignupFormContainer from './session/signup_form_container';

const App = () => (
    <div>
        <NavBarContainer />
        <Switch>
            <AuthRoute exact path="/" component={MainPageContainer} />
            <AuthRoute exact path="/login-student" component={LoginFormContainer} />
            <AuthRoute exact path="/login-instructor" component={LoginFormContainer} />
            <AuthRoute exact path="/signup" component={SignupFormContainer} />

        </Switch>
    </div>
);

export default App;