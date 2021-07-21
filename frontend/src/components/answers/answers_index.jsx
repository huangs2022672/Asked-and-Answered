import React from 'react';
import AnswersItem from './answers_item';

class AnswersIndex extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            body:""
        };
        this.updateBody = this.updateBody.bind(this);
        // this.props.fetchAnswers(this.props.question._id)
    }

    componentDidMount(){
        
        this.props.fetchAnswers(this.props.question._id)
    }

    // componentDidUpdate () {
    //     this.props.fetchAnswers(this.props.question._id)
    // }

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



    render () {
        
        if (this.props.answers.length ===0){
            return(
                <div>Loading...</div>
            )
        } else {   
            const {answers, users} = this.props;
            debugger
            return (
    
                <>
                <div>
                    { answers[0].map(answer => (<AnswersItem
                        users={users}
                        answer={answer}
                        key={answer._id} />))
                 
                    }
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