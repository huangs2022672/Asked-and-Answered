import React from 'react'

class QuestionsEditForm extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            ...props.question
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleUpdate(field) {
        return e => ( this.setState({[field]: e.currentTarget.value}))
    }

    handleSubmit(e){
        e.preventDefault();
        debugger
        this.props.updateQuestion(this.state)
        
    }


    render() {
        return (
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
    }
}

export default QuestionsEditForm;