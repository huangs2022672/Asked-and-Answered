import React from 'react';
import { Link } from 'react-router-dom';
import './css/questions_nav.scss'

class QuestionsNav extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      keyword: ""
    }

    this.handleLogout = this.handleLogout.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)
  }

  handleUpdate(e){
    e.preventDefault();
    this.setState({keyword: e.currentTarget.value})
  }

  handleLogout() {
    this.props.logout()
  }

  render() {

    const { currentUser } = this.props

    return (
      <div className="questions-navbar">
        <div className="aa-logo">
          <Link to="/" className="aa-logo">
            <h2 className="aa-logo">Asked & Answered</h2>
          </Link>
        </div>
        <div className="question-nav-right">
          <div className="questions-searchbar">
            <label className="questions-searchbar">
            <span className="iconify" data-icon="fa-solid:search" data-inline="false"></span>
              <input className="questions-searchbar"
              placeholder="search..."
              value={this.state.keyword}
              onChange={this.handleUpdate}
                type="text" 
                />
                <Link to={`/questions/search/${this.state.keyword}`}>
                <span className="iconify" data-icon="fa-solid:search" data-inline="false"></span>
                </Link>
            </label>
          </div>
          <div className="questions-welcome">
            <span className="questions-welcome">
              {`Hi ${currentUser.name.split(" ")[0]}!`}
            </span>
          </div>
          <div className="questions-logout">
              <div className="logout-button"
              onClick={this.handleLogout}
              >Log Out</div>
          </div>
        </div>
      </div>
    )
  }
}

export default QuestionsNav;