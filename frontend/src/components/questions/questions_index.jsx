import React from 'react'

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
          <div className="unassigned-tab"
          onClick={() => this.setState({currentTab: "unassigned"})}
          >Unassigned</div>

          <div className="pending-tab"
          onClick={() => this.setState({currentTab: "pending"})}
          >Pending</div>

          <div className="mine-tab"
          onClick={() => this.setState({currentTab: "mine"})}
          >Mine</div>

          <div className="resolved-tab"
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