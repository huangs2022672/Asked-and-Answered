import React from 'react';
import AnswersItem from './answers_item';

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
                <div>
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
            )
        }
    }

    render () {  
        const {title, body} = this.props.question[0]
        return(
            <div>
                <div>
                    <div>{title}</div>
                    <div>{body}</div>
                </div>
                <div>
                    {this.renderAnswers()}
                </div>
                <div>
                    <form onSubmit={this.handleSubmit}>
                        <textarea value={this.state.body} id="" cols="30" rows="5"
                        onChange={this.updateBody} />
                        <button type="submit" >Submit</button>
                    </form>
                </div>
            </div>
        )
    }

}

export default AnswersIndex;