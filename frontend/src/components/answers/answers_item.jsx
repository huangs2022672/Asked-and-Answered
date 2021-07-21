import React from 'react';

const AnswersItem =({answer}) => {

    debugger
    return (
        <>
            <ul>
                <div>
                    {answer.author}
                    {/* change to name later */}
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

