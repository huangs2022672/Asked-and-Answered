import React from 'react';

const AnswersItem =({answer, users}) => {

    const userNameHandle = ()=>{   if (users) {const usersN = Object.keys(users).map(key=>users[key]);
    const user = usersN[0].filter(userOb=>userOb._id===answer.author)[0];
    return (user.name);}};
    
    
    return (
        <>
            <ul>
                <div>
                    {userNameHandle()}
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

