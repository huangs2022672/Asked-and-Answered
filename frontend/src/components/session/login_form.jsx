import React from 'react';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            errors: {},
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.renderErrors = this.renderErrors.bind(this);
    }

    componentDidMount(){
        this.props.location.pathname === "/login-student" ? this.setState({role: "student"}) : this.setState({role: "instructor"})
    }
    
    componentWillReceiveProps(nextProps) {
        if (nextProps.currentUser === true) {
            this.props.history.push('/');
        }
        this.setState({errors: nextProps.errors})
    }

    update(field) {
        return e => this.setState({
            [field]: e.currentTarget.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        let user = {
            email: this.state.email,
            password: this.state.password,
            role: this.state.role,
        };
        this.props.login(user); 
    }

    renderErrors() {
        return(
        <ul>
            {Object.keys(this.state.errors).map((error, i) => (
            <li key={`error-${i}`}>
                {this.state.errors[error]}
            </li>
            ))}
        </ul>
        );
    }

    render() {
        return (
        <div>
            <form onSubmit={this.handleSubmit}>
            <div>
                <input type="text"
                    value={this.state.email}
                    onChange={this.update('email')}
                    placeholder="Email"
                />
                <br/>
                <input type="password"
                    value={this.state.password}
                    onChange={this.update('password')}
                    placeholder="Password"
                />
                <br/>
                <input type="submit" value="Submit" />
                {this.renderErrors()}
            </div>
            </form>
            {this.state.role === "student" ? 
                <div>New to A&A?<Link to='/signup'>Sign Up</Link></div> : ""
            }
        </div>
        );
    }
}

export default withRouter(LoginForm);