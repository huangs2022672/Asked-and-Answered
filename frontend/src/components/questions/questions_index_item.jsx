import React from 'react';
import AnswersIndexContainer from '../answers/answers_index_container';

class QuestionIndexItem extends React.Component {

    componentDidUpdate(){
        this.props.fetchAnswers(this.props.question._id)
    }
    render() {
        const {question, users} = this.props
        debugger
        return (
            <div>
                <div>
                    <li>{question.title}</li>
                    <li>{question.body}</li>
                    <li>{question.assigned_to ? "assigned" : "unassigned"}</li>
                    <li>{question.resolved ? "resolved" : "unresolved"}</li>
                </div>
                <div>
                    <AnswersIndexContainer question={question} users={users}/>
                </div>
            </div>
        )
    }
}

export default QuestionIndexItem;