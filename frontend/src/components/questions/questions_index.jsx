import React from 'react'
import QuestionIndexItemContainer from './questions_index_item_container'
import QuestionsNavContainer from './questions_nav_container'
import AnswersIndexContainer from '../answers/answers_index_container'

import './css/questions_index.scss'
import './css/questions_nav.scss'

class QuestionsIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      body: "",
      currentTab: "unassigned"
    };
    this.handleFetchPending = this.handleFetchPending.bind(this);
    this.handleFetchUnassigned = this.handleFetchUnassigned.bind(this);
    this.handleFetchResolved = this.handleFetchResolved.bind(this);
    this.handleUserQuestions = this.handleUserQuestions.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    this.props.fetchUnassigned();
    this.props.fetchAllUsers();
    this.offQuestionShow()
  }

  offQuestionShow(){
    if (this.props.questionShow){
      this.props.questionShowStatus()
    }
  }
  handleSubmit(e){
    e.preventDefault();
    // debugger
    this.props.createQuestion(this.state)
      .then( () => this.setState({ 
        title: "", 
        body: ""
      }));    
  }

  handleUpdate(field){
    return e => this.setState({ [field]: e.currentTarget.value });
  }

  handleFetchPending(){
    this.setState({currentTab: "pending"});
    this.props.fetchPending();
    if (this.props.questionShow) {
      this.props.questionShowStatus();
    }
  }
  handleFetchUnassigned(){
    this.setState({currentTab: "unassigned"});
    this.props.fetchUnassigned();
    if (this.props.questionShow) {
      this.props.questionShowStatus();
    }
  }
  handleFetchResolved(){
    this.setState({currentTab: "resolved"});
    this.props.fetchResolved();
    if (this.props.questionShow) {
      this.props.questionShowStatus();
    }
  }
  handleUserQuestions(){
    this.setState({currentTab: "mine"});
    this.props.fetchUserQuestions(this.props.current_user.id);
    if (this.props.questionShow) {
      this.props.questionShowStatus();
    }
  }


  currentView() {
    const { questions, users } = this.props
    // debugger
    return (
      questions.map(question => {
        return (
          <QuestionIndexItemContainer
            question={question} 
            currentTab={this.state.currentTab}
            users={users}
            key={`question-${question._id}`}
          />
        )
      })
    )

    // if (this.state.currentTab === "unassigned") {
    //   return questions.map( question => {
    //     return (
    //       <QuestionIndexItem question={question} currentTab={this.state.currentTab}/>
    //     )
    //   })
    // } else if (this.state.currentTab === "pending") {
    //   return questions.map( question => {
    //     return (
    //       <QuestionIndexItem question={question} currentTab={this.state.currentTab}/>
    //     )
    //   })
    // } else if (this.state.currentTab === "mine") {
    //   return questions.map( question => {
    //     return (
    //       <QuestionIndexItem question={question} currentTab={this.state.currentTab}/>
    //     )
    //   })
    // } else if (this.state.currentTab === "resolved") {
    //   return questions.map( question => {
    //     return (
    //       <QuestionIndexItem question={question} currentTab={this.state.currentTab}/>
    //     )
    //   })
    // }
  }

  render() {
    const { questions, questionShow, users, current_user } = this.props;   

    return (
      <div className="question__index">

        <QuestionsNavContainer/>

        <div className="questions-index-tabs">
          <div className={this.state.currentTab === "unassigned" ?  (
            "unassigned-tab selected") : ("unassigned-tab")}
          onClick={this.handleFetchUnassigned}
          >Unassigned</div>
          <div className={this.state.currentTab === "pending" ? (
            "pending-tab selected") : ("pending-tab")}
          onClick={this.handleFetchPending}
          >Pending</div>
          <div className={this.state.currentTab === "resolved" ? (
            "resolved-tab selected") : ("resolved-tab")}
          onClick={this.handleFetchResolved}
          >Resolved</div>
          <div className={this.state.currentTab === "mine" ? (
            "mine-tab selected") : ("mine-tab")}
            onClick={this.handleUserQuestions}
          >My Tab</div>
        </div>


        <div className="questions-index-main">
          <div className="questions-view-and-form">

            <div className="questions-index-view">
                { questions ? this.currentView() : null }
            </div>      

            { current_user.role === "student" ? (
              <div className="questions__index__form">
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
                      placeholder="Describe your issue">  
                    </textarea>
                  <button className="question-submit-button"
                  ><span className="iconify" data-icon="akar-icons:send" data-inline="false"></span></button>
                  </div>
                </form>
              </div>
            ) : null}

          </div>
        
          { questionShow ? (
            <div className="questions__index__show">
              <div>
                <AnswersIndexContainer users={users}/>
              </div>
            </div>
          ) : null}

        </div>
      </div>
    )
  }
}

export default QuestionsIndex