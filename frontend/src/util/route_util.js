import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Route, Redirect, withRouter} from 'react-router-dom';

const mSTP = state => (
    {loggedIn: state.session.isAuthenticated}
);

const Auth = ({ component: Component, path, loggedIn, exact}) => (
    <Route path={path} exact={exact} render={(props) => {
        return (
            !loggedIn ? (
                <Component {...props}/>
            ) : (
                <Redirect to="/"/>
            )
        )}} />
)

const Protected = ({ component: Component, loggedIn, ...rest}) => (
    <Route {...rest}
        render = {props =>
            loggedIn ? (
                <Component {...props} />
            ) : (
                <Redirect to="/login" />
            )
        } />
)



export const AuthRoute = withRouter(connect(mSTP)(Auth))
export const ProtectedRoute = withRouter(connect(mSTP)(Protected))