import React from 'react';
import QuestionsEditForm from './questions_edit_form';

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
        debugger
        this.props.updateQuestion(this.state)
            this.setState({editing: false})
        
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
   

    render() {
        const {question} = this.props
        debugger
        return (
            <div>
                {!this.state.editing ? (
                    <div>
                        <li>{question.title}</li>
                        <li>{question.body}</li>
                        <li>{question.assigned_to ? "assigned" : "unassigned"}</li>
                        <li>{question.resolved ? "resolved" : "unresolved"}</li>
                        <button onClick={this.handleDelete}>Delete</button>
                        <button onClick={ () => this.setState({editing: true})}>Edit</button>
                        <button onClick={this.handleAssign}>Assign</button>
                        <button onClick={this.handleResolve}>Resolve</button>
                    </div>
                ) : (
                    (
                        <div>
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