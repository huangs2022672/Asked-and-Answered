import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import './main_page.scss';
import Footer from '../footer/footer'

class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      body: "",
      showing: false
    };

    this.logoutUser = this.logoutUser.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  logoutUser(e) {
    e.preventDefault();
    this.props.logout();
  }

  handleSubmit(e){
    e.preventDefault();
    this.props.createQuestion(this.state)
      .then( () => this.setState({
        title: "",
        body: ""
      }))
      .then(this.props.history.push('/questions'));
  }

  handleUpdate(field){
    return e => this.setState({ [field]: e.currentTarget.value });
  }


  handleClick() {
    if (this.state.showing) {
      this.setState({showing: false});
    } else {
      this.setState({showing: true});
    }
  }

  ensureLoggedin(){
    if(this.props.loggedIn) {
      return(
        <>
          <div>
            <h1 className="welcome_user">Welcome {this.props.session.user.name}</h1>
            {(this.props.session.user.role === "student") ? (
            <Link className="mainbtn" onClick={() => this.handleClick()} >Ask a question</Link>
            ) : null }

            {(this.state.showing) ? (
              <>
                <div className="questions__index__form_main" >
                  <form className="question-create-form"
                    onSubmit={this.handleSubmit}>
                    <div className="question-title-input">
                      <input
                        className="question-title-input"
                        type="text"
                        value={this.state.title}
                        onChange={this.handleUpdate("title")}
                        placeholder="Add a title"
                      />
                    </div>
                    <div className="question-body-input">
                      <textarea
                        className="question-body-input"
                        value={this.state.body}
                        onChange={this.handleUpdate("body")}
                        placeholder="Add a description">
                      </textarea>
                      <button className="question-submit-button">Submit Question</button>
                    </div>
                  </form>
                </div>
              </>
            ) : null }

            <br/>
            <Link className="mainbtn" to="/questions">View questions</Link>

            <br/>
            <Link className="mainbtn" onClick={this.logoutUser}>Log out</Link>

            {(this.props.session.user.role === "instructor") ? (
              <Redirect to="/questions" />
            ) : null }

          </div>
        </>
      )
    } else {
      return(
        <>
          <div>
            <Link to={'/login-student'}><button className="mainbtn">Log in as Student</button></Link>
            <br/>
            <Link to={'/login-instructor'}><button className="mainbtn"> Log in as Instructor</button></Link>
          </div>
        </>
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
        {/* <Footer /> */}
      </>
    );
  }
}

export default MainPage;
