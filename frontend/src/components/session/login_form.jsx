import React from 'react';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './session_form.css';

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
        this.handleDemoInstructor = this.handleDemoInstructor.bind(this);
        this.handleDemoStudent = this.handleDemoStudent.bind(this);
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

    handleDemoStudent () {
        this.setState({
            email:"leo1@gmail.com",
            password: 'leo123',
            role: "student"
        })
        let user = {
            email: this.state.email,
            password: this.state.password,
            role: this.state.role,
        };
        this.props.login(user).then(()=>this.props.history.push('/'));
    };

      handleDemoInstructor () {
        
            this.setState({
                email:"aainstructor@gmail.com",
            password: 'aainstructor',
            role: "instructor"
                })
            let user = {
            email: this.state.email,
            password: this.state.password,
            role: this.state.role,
        };
            this.props.login({user}).then(()=>this.props.history.push('/questions'));
    };


    render() {
        return (
        <div>
            <div className='login-form-nav-bar'><Link to='/'>Asked & Answered</Link></div>
            <div className="login-form-container">
                {this.state.role === "student" ? 
                    <h1 className='login-form-header'>Student Sign In</h1> : 
                    <h1 className='login-form-header'>Instructor Sign In</h1> 
                }
                <form onSubmit={this.handleSubmit}>
                <div className='session-form-errors'>{this.renderErrors()}</div>
                <div>
                    <input type="text"
                        value={this.state.email}
                        onChange={this.update('email')}
                        placeholder="Email"
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
                    <button type='submit' className='login-form-button'>Submit</button> 
                    <br />
                     {this.state.role === "student" ? 
                    <button className="login-form-button" onClick={this.handleDemoStudent}>Demo Student</button> : 
                    <button className="login-form-button" onClick={this.handleDemoInstructor}>Demo Instructor</button>
                }
                    
                </div>
                </form>
                {this.state.role === "student" ? 
                    <div className='login-form-no-account'>New to A&A? <Link to='/signup'>Sign Up</Link></div> 
                    : "" }
            </div>
        </div>
        );
    }
}

export default withRouter(LoginForm);