import React from 'react';
import './css/questions_index_item.css'

class QuestionIndexItem extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            ...props.question,
            editing: false,
            rerender: false
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
        const 
            { 
                currentTab, 
                current_user,
                updateAssignment, 
                question, 
                fetchUnassigned, 
                fetchUserQuestions, 
                fetchPending, 
                fetchResolved 
            } = this.props;
        // debugger
        return updateAssignment(question._id)
            .then( () => {
                if (currentTab === "unassigned") {
                    fetchUnassigned()
                } else if (currentTab === "pending") {
                    fetchPending()
                } else if (currentTab === "mine") {
                    fetchUserQuestions(current_user._id)
                }
            })
        
    }

    handleResolve(){
        const 
        { 
            currentTab, 
            current_user,
            updateResolvedStatus, 
            question, 
            fetchUnassigned, 
            fetchUserQuestions, 
            fetchPending, 
            fetchResolved 
        } = this.props;

        return updateResolvedStatus(question._id)
        .then( () => {
            if (currentTab === "resolved") {
                fetchResolved()
            } else if (currentTab === "pending") {
                fetchPending()
            } else if (currentTab === "mine") {
                fetchUserQuestions(current_user._id)
            }
        })
    }

    handleQuestionShow() {
        this.props.questionShowStatus()
    }

    render() {
        const {question, users, current_user} = this.props
        let author 
        debugger
        if (users && question) {
            debugger
            users.forEach( user => {
                 if (user._id === question.author) {
                    author = user
                }
            })
        }

        return (
            <div className="questions-index-item">
                {!this.state.editing ? (
                    <div className="question-not-editing">
                        <div className="username">
                            {author ?
                                author.name
                                :
                                null
                            }
                        </div>
                        <div className="question-title"
                            >{question.title}</div>
                        <div className="question-body"
                            >{question.body}</div>
                        <div className="question-assigned"
                            >{question.assigned_to ? "assigned" : "unassigned"}</div>
                        <div className="question-resolved"
                            >{question.resolved ? "resolved" : "unresolved"}</div>

                        { current_user && author && current_user.id === author._id ?  
                        <div className="user__edit__delete">
                            <button className="question-delete"
                                onClick={this.handleDelete}>Delete</button>
                            <button className="question-edit"
                                onClick={ () => this.setState({editing: true})}>Edit</button>
                            </div> 
                            :
                            null   
                        }    
                        
                        { 
                            (question.assigned_to === null && current_user.role === "instructor") 
                                || 
                            (question.assigned_to !== null && current_user._id ===  question.assigned_to)
                                ? 
                            <button className="question-assign-button"
                                onClick={this.handleAssign}>{question.assigned_to ? "UNASSIGN" : "ASSIGN"}</button>
                            :
                            null
                        }
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