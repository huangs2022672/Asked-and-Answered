import React from 'react'
import { fetchUnassigned } from '../../actions/question_actions'
import './questions_index.css'

class QuestionsIndex extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentTab: "unassigned"
    }
    this.handleFetchPending = this.handleFetchPending.bind(this);
    this.handleFetchUnassigned = this.handleFetchUnassigned.bind(this);
    this.handleFetchResolved = this.handleFetchResolved.bind(this);
    this.handleUserQuestions = this.handleUserQuestions.bind(this);
  }

  componentDidMount(){
    this.props.fetchUnassigned()
  }

  handleFetchPending(){
    this.setState({currentTab: "pending"});
    this.props.fetchPending()
  }
  handleFetchUnassigned(){
    this.setState({currentTab: "unassigned"});
    this.props.fetchUnassigned()
  }
  handleFetchResolved(){
    this.setState({currentTab: "resolved"});
    this.props.fetchResolved()
  }
  handleUserQuestions(){
    debugger
    this.setState({currentTab: "mine"});
    this.props.fetchUserQuestions(this.props.current_user.id)
  }

  currentView() {
    const { questions } = this.props
    if (this.state.currentTab === "unassigned") {
      return questions.map( question => {
          return (
              <div>
                <li>{question.title}</li>
                <li>{question.body}</li>
                <li>{question.assigned_to ? "assigned" : "unassigned"}</li>
                <li>{question.resolved ? "resolved" : "unresolved"}</li>
              </div>
          )
        })
    } else if (this.state.currentTab === "pending") {
      return questions.map( question => {
        return (
            <div>
              <li>{question.title}</li>
              <li>{question.body}</li>
              <li>{question.assigned_to ? "assigned" : "unassigned"}</li>
              <li>{question.resolved ? "resolved" : "unresolved"}</li>
            </div>
        )
      })
    } else if (this.state.currentTab === "mine") {
      return questions.map( question => {
        return (
            <div>
              <li>{question.title}</li>
              <li>{question.body}</li>
              <li>{question.assigned_to ? "assigned" : "unassigned"}</li>
              <li>{question.resolved ? "resolved" : "unresolved"}</li>
            </div>
        )
      })
    } else if (this.state.currentTab === "resolved") {
      return questions.map( question => {
        return (
            <div>
              <li>{question.title}</li>
              <li>{question.body}</li>
              <li>{question.assigned_to ? "assigned" : "unassigned"}</li>
              <li>{question.resolved ? "resolved" : "unresolved"}</li>
            </div>
        )
      })
    }
  }

  render() {
    const { questions } = this.props
    

    return (
      <div className="questions-index-main">

        <div className="questions-index-tabs">
          <div className={this.state.currentTab === "unassigned" ?  (
            "unassigned-tab selected") : ("unassigned-tab")}
          onClick={this.handleFetchUnassigned}
          >Unassigned</div>

          <div className={this.state.currentTab === "pending" ? (
            "pending-tab selected") : ("pending-tab")}
          onClick={this.handleFetchPending}
          >Pending</div>

          <div className={this.state.currentTab === "mine" ? (
            "mine-tab selected") : ("mine-tab")}
            onClick={this.handleUserQuestions}
          >Mine</div>

          <div className={this.state.currentTab === "resolved" ? (
            "resolved-tab selected") : ("resolved-tab")}
          onClick={this.handleFetchResolved}
          >Resolved</div>
        </div>
            
        <div className="questions-index-view">
          { 
            questions ? this.currentView() : null
          }
        </div>

      </div>
    )
  }
}

export default QuestionsIndex