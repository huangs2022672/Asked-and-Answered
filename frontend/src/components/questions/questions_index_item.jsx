import React from 'react';
import './css/questions_index_item.css'

class QuestionIndexItem extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            ...props.question,
            editing: false
        }
        
        this.handleDelete = this.handleDelete.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleAssign = this.handleAssign.bind(this);
        this.handleResolve = this.handleResolve.bind(this);
        this.handleQuestionShow = this.handleQuestionShow.bind(this);
    }

    handleDelete(){
        const { question } = this.props;
        this.props.deleteQuestion(question._id)
    }


    handleUpdate(field) {
        return e => ( this.setState({[field]: e.currentTarget.value}))
    }

    handleSubmit(e){
        e.preventDefault();
        // debugger
        this.props.updateQuestion(this.state)
            .then(() => this.setState({editing: false}))                   
    }

    handleAssign(){
        const { updateAssignment, question } = this.props;
        // debugger
        return updateAssignment(question._id)
    }

    handleResolve(){
        const { updateResolvedStatus, question } = this.props;
        return updateResolvedStatus(question._id)
    }

    handleQuestionShow() {
        debugger
        this.props.questionShowStatus(this.props.question._id)
    }

    render() {
        const {question} = this.props
        debugger
        return (
            <div className="questions-index-item">
                {!this.state.editing ? (
                    <div className="question-not-editing">
                        <div className="question-title"
                            >{question.title}</div>
                        <div className="question-body"
                            >{question.body}</div>
                        <div className="question-assigned"
                            >{question.assigned_to ? "assigned" : "unassigned"}</div>
                        <div className="question-resolved"
                            >{question.resolved ? "resolved" : "unresolved"}</div>
                        <button className="question-delete"
                            onClick={this.handleDelete}>Delete</button>
                        <button className="question-edit"
                            onClick={ () => this.setState({editing: true})}>Edit</button>
                        <button className="question-assign-button"
                            onClick={this.handleAssign}>{question.assigned_to ? "UNASSIGN" : "ASSIGN"}</button>
                        <button className="question-resolve-button"
                            onClick={this.handleResolve}>{question.resolved ? "UNRESOLVED" : "RESOLVED"}</button>
                        <button className="question-show-button"
                            onClick={this.handleQuestionShow}>Reply</button>
                    </div>
                ) : (
                    (
                    <div className="question-editing">
                        <form className="question-form"
                        onSubmit={this.handleSubmit}>
                            <label>
                                <input 
                                    type="text" 
                                    value={this.state.title} 
                                    onChange={this.handleUpdate("title")}
                                />
                            </label>
                            <label>
                                <textarea 
                                    value={this.state.body} 
                                    onChange={this.handleUpdate("body")}>  
                                </textarea>
                            </label>
                            <button>Update</button>
                        </form>
                    </div>
                    )
                )}
            </div>
        )
    }
}

export default QuestionIndexItem;