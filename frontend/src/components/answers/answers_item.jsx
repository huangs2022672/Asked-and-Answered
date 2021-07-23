import React, {useState} from 'react';
import './css/answer_item.scss'


const AnswersItem =({answer, users, currentUser, updateAnswer, deleteAnswer, questionId}) => {

    const [editing, setEditing] = useState(false);
    const [body, setBody] = useState(answer.body);

    const handleSubmit=(e)=>{
        e.preventDefault();
        const newAnswer = Object.assign({},{id:answer._id, body});
        updateAnswer(questionId, newAnswer);
        setEditing(false);
    };

    const handleEdit =()=> {
        setEditing(true);
    };


    const edit_area = (editing === true) ? (
        <>
            <form className="question-form"
                onSubmit={handleSubmit}>
                    <label>
                        <textarea 
                            value={body} 
                            onChange={(e)=>setBody(e.target.value)}>  
                        </textarea>
                    </label>
                    <button type="submit">Update</button>
                </form>
        </>) : (null)



    
    const renderUser = () => {
        let user = users.filter(user => user._id === answer.author);
        return (user[0].name[0].toUpperCase() + user[0].name.slice(1));
    };


    const edit_delete_buttons = (currentUser.id===answer.author) ? 
        (<><button className="question-delete"
                onClick={()=>deleteAnswer(questionId, answer._id)}>Delete</button>
            <button className="question-edit"
                onClick={ handleEdit} >Edit</button>
            {edit_area}</>):(null)

    const convertDate = () => {
        let date = answer.date
        return `${date.slice(5,7)}/${date.slice(8,10)}/${date.slice(0,4)}`
    }
    
    return (
        <div className="answer-item-wrapper">
            <div className='answer-item-container'>
                <div className='answer-item-author-info'>
                    <div className="answer-item-name">{renderUser()}</div>  
                    <div className="answer-item-date">{convertDate()}</div>         
                </div>
                <div className="answer-item-body">{answer.body}</div>
            </div>
            <div className="answer-item-button">{edit_delete_buttons}</div>
        </div>
)
}

export default AnswersItem

