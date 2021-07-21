import React from 'react';
import AnswersItem from './answers_item';

class AnswersIndex extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            body:""
        };
        this.updateBody = this.updateBody.bind(this);
        this.props.fetchAnswers(this.props.question._id)
    }

    componentDidMount(){
        debugger
        this.props.fetchAnswers(this.props.question._id)
    }

    updateBody(e) {
        e.preventDefault();
        this.setState({
            body:e.target.value
            });
            }

    handleSubmit(e) {
        e.preventDefault();
        this.props.createAnswer(this.props.question._id, this.state);
    }

    renderAnswers(){
        const {answers, users} = this.props
        debugger
        if(answers.length > 1){
            if (answers[0].length > 1){
            answers[0].map(answer => {
                console.log(answer)
                return <AnswersItem
                        users={users}
                        answer={answer}
                        key={answer._id} />
            })} 
        } else {
            return null
        }
    }

    render () {
        if (!this.props.answers){
            return(
                <div>Loading...</div>
            )
        } else {    
            return (
    
                <>
                <div>
                    {this.renderAnswers()}
                </div>
    
                <form onSubmit={this.handleSubmit}>
                    <textarea value={this.state.body} id="" cols="30" rows="10"
                    onchange={this.updateBody} />
    
                    <button type="submit" >Submit</button>
                </form>
                </>
    
            )
        }
    }



}

export default AnswersIndex;