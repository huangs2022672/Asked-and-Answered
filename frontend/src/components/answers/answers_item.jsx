import React, {useState} from 'react';



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
    </>)
 : (null)



    
    const renderUser = () => {
        let user = users.data.filter(user => user._id === answer.author);
        return user[0].name;
    };



    const edit_delete_buttons = (currentUser.id===answer.author) ? (<>
    <button className="question-delete"
                            onClick={()=>deleteAnswer(questionId, answer._id)}>Delete</button>
                        <button className="question-edit"
                            onClick={ handleEdit} >Edit</button>
                            {edit_area}</>):(null)

    // debugger
    return (
        <>
            <ul>
                <div>
                    {renderUser()}
                </div>
                <div>
                    {answer.body}
                </div>
                <div>{answer.date}</div>         
            </ul>
            {edit_delete_buttons}

        </>
)
}

export default AnswersItem

