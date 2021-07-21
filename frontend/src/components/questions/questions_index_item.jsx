import React from 'react';

class QuestionIndexItem extends React.Component {
    render() {
        const {question} = this.props
        return (
            <div>
            <li>{question.title}</li>
            <li>{question.body}</li>
            <li>{question.assigned_to ? "assigned" : "unassigned"}</li>
            <li>{question.resolved ? "resolved" : "unresolved"}</li>
          </div>
        )
    }
}

export default QuestionIndexItem;