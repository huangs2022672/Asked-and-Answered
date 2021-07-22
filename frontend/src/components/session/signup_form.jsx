import React from 'react';
import { withRouter, Link} from 'react-router-dom';
import './session_form.css'

class SignupForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            name: '',
            password: '',
            password2: '',
            errors: {},
            role: 'student'
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.clearedErrors = false;
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.signedIn === true) {
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
        name: this.state.name,
        password: this.state.password,
        password2: this.state.password2,
        role: this.state.role
        };
        this.props.signup(user, this.props.history); 
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
        <div >
            <div className='login-form-nav-bar'><Link to='/'>Asked & Answered</Link></div>
            <div className="login-form-container">
                <form onSubmit={this.handleSubmit}>
                    <h1 className='login-form-header'>Sign Up</h1>
                    <div className='session-form-errors'>{this.renderErrors()}</div>
                    <div className="signup-form">
                        <br/>
                        <input type="text"
                            value={this.state.email}
                            onChange={this.update('email')}
                            placeholder="Email"
                            className='login-form-input'
                        />
                        <br/>
                        <input type="text"
                            value={this.state.name}
                            onChange={this.update('name')}
                            placeholder="Name"
                            className='login-form-input'
                        />
                        <br/>
                        <input type="password"
                            value={this.state.password}
                            onChange={this.update('password')}
                            placeholder="Password"
                            className='login-form-input'
                        />
                        <br/>
                        <input type="password"
                            value={this.state.password2}
                            onChange={this.update('password2')}
                            placeholder="Confirm Password"
                            className='login-form-input'
                        />
                        <br/>
                        <button type='submit' className='login-form-button'>Submit</button> 
                </div>
                </form>
                <div className='login-form-no-account'>Already registered at A&A? <Link to='/login-student'>Log In</Link></div> 
            </div>
        </div>
        );
    }
}

export default withRouter(SignupForm);