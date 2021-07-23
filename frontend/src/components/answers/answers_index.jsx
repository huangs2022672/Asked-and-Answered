import React from 'react';
import AnswersItem from './answers_item';
import './css/answers_index.scss'

class AnswersIndex extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            body:""
        };
        this.updateBody = this.updateBody.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        this.props.fetchAnswers(this.props.question[0]._id);
    }

    updateBody(e) {
        e.preventDefault();
        this.setState({
            body:e.target.value
            });
            }

    handleSubmit(e) {
        e.preventDefault();
        
        this.props.createAnswer(this.props.question[0]._id, this.state);
        this.setState({
            body:""
            });
    }

    renderAnswers(){
        if (this.props.answers.length === 0){
            return(
                <div></div>
            )
        } else {
            const {answers, users} = this.props
            return(
                <div className="answer_idx_container">
                    <div className="answer_list_header">{answers[0].length} Answers: </div>
                    <div className="answer_list">
                        { answers[0].map(answer => (<AnswersItem
                            users={users}
                            answer={answer}
                            key={answer._id}
                            currentUser={this.props.currentUser}
                            updateAnswer={this.props.updateAnswer}
                            deleteAnswer={this.props.deleteAnswer}
                            questionId={this.props.question[0]._id} />))
                        }
                    </div>
                </div>
            )
        }
    }

    render () {  
        debugger
        const {title, body} = this.props.question[0]
        return(
            <div className="answer_idx_wrapper">
                <div className="answer-index-body">
                    <div className="answer_idx_question_container">
                        <div className="answer_idx_question_title">{title}</div>
                        <div className="answer_idx_question_body">{body}</div>
                    </div>
                    <div className="all-answers"> 
                        {this.renderAnswers()}
                    </div>
                </div>
                <div className="answers-index-form">
                    <form className="input-form" onSubmit={this.handleSubmit}>
                        <textarea className="answers-body-input" value={this.state.body}  
                        onChange={this.updateBody} />
                        <button className="answer-submit-button">
                            <span className="iconify" 
                                data-icon="fa-mail-reply" 
                                data-inline="false">
                            </span>
                        </button>
                    </form>
                </div>
            </div>
        )
    }

}

export default AnswersIndex;