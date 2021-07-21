import React from 'react';

class QuestionIndexItem extends React.Component {
    constructor(props){
        super(props)
        this.handleDelete = this.handleDelete.bind(this)
    }

    handleDelete(){
        const { question } = this.props;
        debugger
        this.props.deleteQuestion(question._id)
    }


    render() {
        const {question} = this.props
        return (
            <div>
                <li>{question.title}</li>
                <li>{question.body}</li>
                <li>{question.assigned_to ? "assigned" : "unassigned"}</li>
                <li>{question.resolved ? "resolved" : "unresolved"}</li>
                <button onClick={this.handleDelete}>Delete</button>
            </div>
        )
    }
}

export default QuestionIndexItem;