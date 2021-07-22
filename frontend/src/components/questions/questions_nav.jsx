import React from 'react';
import { Link } from 'react-router-dom';


class QuestionsNav extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      keyword: ""
    }
  }

  render() {
    <div className="questions-navbar">
      <div className="aa-logo">
        <h1 className="aa-logo">Asked & Answered</h1>
      </div>
      <div className="questions-searchbar">
        <label className="questions-searchbar">
          <input className="questions-searchbar" 
            type="text" />
        </label>
      </div>
      <div className="questions-welcome">
        <span className="questions-welcome">

        </span>
      </div>
      <div className="questions-logout">
          <button className="questions-logout">

          </button>
      </div>
    </div>
  }
}

export default QuestionsNav;