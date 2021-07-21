import React from 'react';

export const AnswersItem =({answer}) => {


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

