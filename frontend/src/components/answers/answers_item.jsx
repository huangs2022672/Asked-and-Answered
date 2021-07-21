import React from 'react';

const AnswersItem =({answer, users}) => {

    // debugger
    return (
        <>
            <ul>
                <div>
                    {answer.author}
                    
                </div>
                <div>
                    {answer.body}
                </div>
                <div>{answer.date}</div>         
            </ul>
        </>
)
}

export default AnswersItem

