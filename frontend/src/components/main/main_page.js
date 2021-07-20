import React from 'react';
import { Link } from 'react-router-dom';

class MainPage extends React.Component {
    constructor(props) {
        super(props);
        this.logoutUser = this.logoutUser.bind(this);
    }

    logoutUser(e) {
        e.preventDefault();
        this.props.logout();
    }

    ensureLoggedin(){
        debugger
        if(this.props.loggedIn){
            return(
                <div>
                    <h1>Question index container goes here</h1>  
                    <button onClick={this.logoutUser}>Logout</button> 
                </div>
            )
        } else {
            return(
                <div>
                    <Link to={'/login-student'}><button>Log in as Student</button></Link>
                    <Link to={'/login-instructor'}><button>Log in as Instructor</button></Link>
                </div>
            )
        }
    }

    render() {
        debugger
        return (
        <div>
            <h1>Asked & Answered</h1>
            <div>
                {this.ensureLoggedin()}
            </div>
        </div>
        );
    }
}

export default MainPage;