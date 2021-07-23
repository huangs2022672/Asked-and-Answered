import React, {useState} from 'react';
import './css/answer_item.scss'


class AnswersItem extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            body: this.props.answer.body,
            edit: false
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    } 


    handleSubmit(e){
        const {answer, body, questionId} = this.props
        e.preventDefault();
        const newAnswer = Object.assign({},{id: answer._id, body: this.state.body});
        updateAnswer(questionId, newAnswer);
        this.setState({edit: false});
    };

    update(field){
        return e => this.setState({[field]: e.currentTarget.value})
    }

    handleEdit() {
        this.setState({edit: true});
    };


    // const edit_area = (editing === true) ? (
    //     <>
    //         <form className="question-form"
    //             onSubmit={handleSubmit}>
    //                 <label>
    //                     <textarea 
    //                         value={body} 
    //                         onChange={(e)=>setBody(e.target.value)}>  
    //                     </textarea>
    //                 </label>
    //                 <button type="submit">Update</button>
    //             </form>
    //     </>) : (null)



    
    renderUser(){
        const {users, answer} = this.props
        let user = users.filter(user => user._id === answer.author);
        return (user[0].name[0].toUpperCase() + user[0].name.slice(1));
    };


    edit_delete_buttons(){
        return ((currentUser.id===answer.author) ? 
        (<><button className="question-delete"
                onClick={()=>deleteAnswer(questionId, answer._id)}>Delete</button>
            <button className="question-edit"
                onClick={this.handleEdit}>Edit</button>
        </>):(null))
    }

    convertDate(){
        let date = answer.date
        return `${date.slice(5,7)}/${date.slice(8,10)}/${date.slice(0,4)}`
    }
<<<<<<< HEAD

    // debugger

    // renderAnswers = () => {
    //     debugger
    //     return (editing === true) ? 
    //         (<div className="answer-item-wrapper">
    //             <div className='answer-item-container'>
    //                 <div className='answer-item-author-info'>
    //                     <div className="answer-item-name">{renderUser()}</div>  
    //                     <div className="answer-item-date">{convertDate()}</div>         
    //                 </div>
    //             <div className="answer-item-body">{answer.body}</div>
    //             </div>
    //             <div className="answer-item-button">{this.edit_delete_buttons()}</div>
    //             </div>
    //             ) : ( 
    //                 <div className="answer-item-wrapper">
    //                     <form className="question-form" onSubmit={this.handleSubmit}>
    //                     <label>
    //                         <textarea 
    //                             value={this.state.body} 
    //                             onChange={this.update('body')}>  
    //                         </textarea>
    //                     </label>
    //                     <button type="submit">Update</button>
    //                     </form>
    //                 </div>)
    // }

    render(){
        debugger
        const {answer} = this.props
        if (!this.state.edit) {
            return(
                <div className="answer-item-wrapper">
                    <div className='answer-item-container'>
                        <div className='answer-item-author-info'>
                            <div className="answer-item-name">{renderUser()}</div>  
                            <div className="answer-item-date">{convertDate()}</div>         
                        </div>
                    <div className="answer-item-body">{answer.body}</div>
                    </div>
                    <div className="answer-item-button">{edit_delete_buttons()}</div>
=======
    
    return (
        <div className="answer-item-wrapper">
            <div className='answer-item-container'>
                <div className='answer-item-author-info'>
                    <div className="answer-item-name">{renderUser()}</div>  
                    <div className="answer-item-date">{convertDate()}</div>         
>>>>>>> main
                </div>
            )
        } else {
            return (
                <div className="answer-item-wrapper">
                        <form className="question-form" onSubmit={this.handleSubmit}>
                        <label>
                            <textarea 
                                value={this.state.body} 
                                onChange={this.update('body')}>  
                            </textarea>
                        </label>
                        <button type="submit">Update</button>
                        </form>
                    </div>
            )
        }
    }
        // <div className="answer-item-wrapper">
            // <div className='answer-item-container'>
            //     <div className='answer-item-author-info'>
            //         <div className="answer-item-name">{renderUser()}</div>  
            //         <div className="answer-item-date">{convertDate()}</div>         
            //     </div>
            //     <div className="answer-item-body">{answer.body}</div>
            // </div>
            // <div className="answer-item-button">{edit_delete_buttons}</div>
        // </div>

}



export default AnswersItem

