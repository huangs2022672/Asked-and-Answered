import React from 'react';

const AnswersItem =({answer, users}) => {

    // const userNameHandle = ()=>{   if (users) {const usersN = Object.keys(users).map(key=>users[key]);
    // const user = usersN[0].filter(userOb=>userOb._id===answer.author)[0];
    // return (user.name);}};
    const renderUser = () => {
        let user = users.data.filter(user => user._id === answer.author)
        return user[0].name
    }

    debugger
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
        </>
)
}

export default AnswersItem

