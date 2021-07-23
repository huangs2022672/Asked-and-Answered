import React from 'react';
import './css/questions_index_item.scss'

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

    offQuestionShow(){
        if (this.props.questionShow){
            this.props.questionShowStatus()
        }
    }

    handleDelete(){
        this.offQuestionShow()
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
        this.offQuestionShow()
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
        // debugger
        this.props.questionShowStatus(this.props.question._id);
    }

    render() {
        const {question, users, current_user} = this.props
        let author
        let assigned_to
        if (users && question) {
            users.forEach( user => {
                if (user._id === question.author) {
                    author = user
                }
                if (question.assigned_to && 
                    question.assigned_to === user._id) {
                    assigned_to = user
                }
            })
        }        
        // debugger
        return (
            <div className="questions-index-item">
                {!this.state.editing ? (
                    <div className="question-not-editing">
                        
                        <div className="handle-question-show"
                        onClick={this.handleQuestionShow}>
                            <div className="question-author">{author ? (`${author.name.split(" ")[0]}`) : null}<div className="asks">asks:</div><div className="question-title">{question.title}</div></div>
                            
                            <div className="question-body">{question.resolved ? "[RESOLVED]" : (question.assigned_to ? "[PENDING]" : "[UNASSIGNED]")} {question.body}</div>                            
                        </div>

                        <div className="question-status">
                            <div className={`question-assigned-status ${question.assigned_to ? "green-status" : "yellow-status"}`}>{question.assigned_to ? (`Assigned to: ${assigned_to.name.split(" ")[0]}`): "UNASSIGNED"}</div>
                            {/* <div className={`question-resolved-status ${question.resolved ? "green-status" : "yellow-status"}`}>{question.resolved ? "RESOLVED" : "UNRESOLVED"}</div> */}
                        </div>
                        
                        <div className="question-functions">
                            { (question.assigned_to === null && current_user.role === "instructor" && !question.resolved ) || 
                                (question.assigned_to !== null && current_user.id === question.assigned_to && !question.resolved ) ? (
                                    <button className="question-assign-button"
                                    onClick={this.handleAssign}>{question.assigned_to ? "UNASSIGN" : "ASSIGN"}</button>
                            ) : null}

                            { (current_user && current_user.id === question.author) || 
                                (question.assigned_to !== null && current_user.id ===  question.assigned_to) ? (
                                    <button className="question-resolve-button"
                                    onClick={this.handleResolve}>{question.resolved ? "MARK UNRESOLVED" : "MARK RESOLVED"}</button>
                            ) : null}

                            { (current_user && current_user.id === question.author) ? (
                                <div className="user__edit__delete">
                                    <div className="question-edit" 
                                    onClick={ () => this.setState({editing: true})}><span className="iconify" data-icon="bx:bxs-edit" data-inline="false"></span></div>
                                    <div className="question-delete" 
                                    onClick={this.handleDelete}><span className="iconify" data-icon="carbon:delete" data-inline="false"></span></div>
                                </div> 
                            ) : null} 
                        </div>

                    </div>
                ) : ((
                    <div className="question-editing">
                        <form className="question-form"
                        onSubmit={this.handleSubmit}>
                            <div className="question-title-input">
                                <input
                                    type="text" 
                                    value={this.state.title} 
                                    onChange={this.handleUpdate("title")}
                                />
                            </div>
                            <div className="question-body-input">
                                <textarea
                                
                                    value={this.state.body} 
                                    onChange={this.handleUpdate("body")}>  
                                </textarea>
                                <button className="question-update-button"><span className="iconify" data-icon="dashicons:update" data-inline="false"></span></button>
                            </div>
                        </form>
                    </div>
                ))}
            </div>
        )
    }
}

export default QuestionIndexItem;