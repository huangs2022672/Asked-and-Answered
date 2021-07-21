import React from 'react'
import './questions_index.css'
import QuestionIndexItem from './questions_index_item'

class QuestionsIndex extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: "",
      body: "",
      currentTab: "unassigned"
    }
    this.handleFetchPending = this.handleFetchPending.bind(this);
    this.handleFetchUnassigned = this.handleFetchUnassigned.bind(this);
    this.handleFetchResolved = this.handleFetchResolved.bind(this);
    this.handleUserQuestions = this.handleUserQuestions.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    this.props.fetchUnassigned()
  }

  handleSubmit(e){
    e.preventDefault();
    // debugger
    this.props.createQuestion(this.state)
    this.setState({ 
      title: "", 
      body: ""
    })    
      // .then( () => this.setState({ 
      //   title: "", 
      //   body: ""
      // }))    
  }

  handleUpdate(field){
    return e => this.setState({ [field]: e.currentTarget.value })
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
    this.setState({currentTab: "mine"});
    this.props.fetchUserQuestions(this.props.current_user.id)
  }

  currentView() {
    const { questions, deleteQuestion } = this.props
    if (this.state.currentTab === "unassigned") {
      return questions.map( question => {
          return (
            <QuestionIndexItem question={question} deleteQuestion={deleteQuestion}/>

          )
        })
    } else if (this.state.currentTab === "pending") {
      return questions.map( question => {
        return (
          <QuestionIndexItem question={question} />
        )
      })
    } else if (this.state.currentTab === "mine") {
      return questions.map( question => {
        return (
          <QuestionIndexItem question={question} />
        )
      })
    } else if (this.state.currentTab === "resolved") {
      return questions.map( question => {
        return (
          <QuestionIndexItem question={question} />
        )
      })
    }
  }

  render() {
    const { questions } = this.props
    

    return (
      <div className="question__index">
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

          <div className="questions__index__form">
            <form onSubmit={this.handleSubmit}>
              <label> Title:
                <input 
                  type="text" 
                  value={this.state.title} 
                  onChange={this.handleUpdate("title")}
                />
              </label>
              <label>Description:
                <textarea 
                  value={this.state.body} 
                  onChange={this.handleUpdate("body")}>  
                </textarea>
              </label>
              <button>Ask a Question</button>
            </form>
          </div>
        </div>
        <div className="question__index__show">
          question__index__show
        </div>
      </div>
    )
  }
}

export default QuestionsIndex