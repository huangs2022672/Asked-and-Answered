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
                <div >
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
        const {title, body} = this.props.question[0]
        return(
            <div className="answer_idx_wrapper">
                <div className="answer_idx_question_container">
                    <div className="answer_idx_question_title">{title}</div>
                    <div className="answer_idx_question_body">{body}</div>
                </div>
                <div className="answer_idx_container">
                    <div>{this.renderAnswers()}</div>
                </div>
                <div className="questions_index_form">
                    <form onSubmit={this.handleSubmit}>
                        <textarea value={this.state.body}  id="" cols="30" rows="5" 
                        onChange={this.updateBody} />
                        <button type="submit" >Submit</button>
                    </form>
                </div>
            </div>
        )
    }

}

export default AnswersIndex;