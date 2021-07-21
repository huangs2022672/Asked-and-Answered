import React from 'react';
import AnswersItem from './answers_item';

class AnswersIndex extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            body:""
        };
        this.updateBody = this.updateBody.bind(this);
    
    }

   updateBody(e) {
       e.preventDefault();
       this.setState({
           body:e.target.value
            });
            }

    handleSubmit(e) {
        e.preventDefault();
        this.props.createAnswer(this.props.question.id, this.state);
    }
           
  
    render () {
        const answers = this.props;

        return (

            <>
            <div>
            <ul>
            {
                answers.map(answer=>(
                    <AnswersItem
                    answer={answer}
                    key={answer.id} />
                ))
            }

            </ul>

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

export default AnswersIndex;