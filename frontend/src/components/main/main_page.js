import React from 'react';
import { Link } from 'react-router-dom';
import './main_page.css';

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
        if(this.props.loggedIn){
            return(
                <div>
                    <h1>Question index container goes here</h1>  
                    <h1 className="welcome_user">Welcome {this.props.session.user.name}</h1>
                    <button className="mainbtn" onClick={this.logoutUser}>Logout</button> 
                </div>
            )
        } else {
            return(
                <div>
                    <Link to={'/login-student'}><button className="mainbtn">Log in as Student</button></Link>
                    <br></br>
                    <Link to={'/login-instructor'}><button className="mainbtn"> Log in as Instructor</button></Link>
                </div>
            )
        }
    }

    render() {
        return (
            <>
        <div className="main_page">
            <p className="main_logo">Asked & Answered</p>
            <div>
                {this.ensureLoggedin()}
            </div>
        </div>
        </>
        );
    }
}

export default MainPage;