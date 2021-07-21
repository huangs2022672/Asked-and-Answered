import React from 'react'
import './questions_index.css'

class QuestionsIndex extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentTab: "unassigned"
    }
  }

  currentView() {
    if (this.state.currentTab === "unassigned") {
      return <div>ALL UNASSIGNED QUESTIONS HERE</div>
    } else if (this.state.currentTab === "pending") {
      return <div>ALL PENDING QUESTIONS HERE</div>
    } else if (this.state.currentTab === "mine") {
      return <div>ALL MY POSTED/ASSIGNED QUESTIONS HERE</div>
    } else if (this.state.currentTab === "resolved") {
      return <div>ALL RESOLVED QUESTIONS HERE</div>
    }
  }

  render() {

    return (
      <div className="questions-index-main">

        <div className="questions-index-tabs">
          <div className={this.state.currentTab === "unassigned" ? (
            "unassigned-tab selected") : ("unassigned-tab")}
          onClick={() => this.setState({currentTab: "unassigned"})}
          >Unassigned</div>

          <div className={this.state.currentTab === "pending" ? (
            "pending-tab selected") : ("pending-tab")}
          onClick={() => this.setState({currentTab: "pending"})}
          >Pending</div>

          <div className={this.state.currentTab === "mine" ? (
            "mine-tab selected") : ("mine-tab")}
          onClick={() => this.setState({currentTab: "mine"})}
          >Mine</div>

          <div className={this.state.currentTab === "resolved" ? (
            "resolved-tab selected") : ("resolved-tab")}
          onClick={() => this.setState({currentTab: "resolved"})}
          >Resolved</div>
        </div>

        <div className="questions-index-view">
          { 
            this.currentView()
          }
        </div>

      </div>
    )
  }
}

export default QuestionsIndex