import React from 'react';
import {Link} from 'react-router-dom';
import QuestionIndexItemContainer from '../questions/questions_index_item_container';
import QuestionsNavContainer from '../questions/questions_nav_container';
import AnswersIndexContainer from '../answers/answers_index_container';

import './css/search_index.scss';
 

class SearchIndexItem extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            term: ""
        }
        this.filteredQuestions = {}
        
    }

    offQuestionShow(){
        if (this.props.questionShow){
            this.props.questionShowStatus()
        }
    }

    componentDidMount(){
        this.props.fetchAllQuestions()
    }

    filterQuestions(){
        if (!this.props.questions) {
            return null;
        }
        let searchTerms = this.props.match.params.query.split(" ");
        searchTerms.forEach( searchTerm => {
            (this.props.questions.forEach( question => {
                if ((question.title.includes(searchTerm) || question.body.includes(searchTerm)) && !this.filteredQuestions[question._id]) {
                    this.filteredQuestions[question._id] = question
                }
            })
        )})

        if (Object.values(this.filteredQuestions).length === 0) {
            return (
                <div className="questions__error__photo">
                    <Link to={`/questions`}>
                        <img className="noQuestions__photo" src="https://lh3.googleusercontent.com/uuAY9MTdjUiKjq8S7A84XwW10rhn6rFDtzpYlbharvBFgYSmYC94aH0HIkqIbPKu3yMS2QTiuqEZB2acKy0BgZWJQngd5GXCt_bFrWJ3Hdab0g_NW415uQDpd4Q5xJKA26NteihZjw=w2400"/> 
                    </Link>
                </div>
            )
        }
        return (
            <div className="question__index">
                <QuestionsNavContainer/>
                <h1>{Object.values(this.filteredQuestions).length} results for {this.props.match.params.query}</h1>
                <div className="questions-index-main">
                    <div className='questions-index-view'>
                        {Object.values(this.filteredQuestions).map(question => (
                            <div><QuestionIndexItemContainer 
                                question={question} 
                                users={this.props.users}
                                key={`question-${question._id}`}
                                /></div>))}
                    </div>
                    { this.props.questionShow ? (
                    <div className="questions__index__show">  
                        <AnswersIndexContainer users={this.props.users}/>
                    </div>)
                    : null}
                </div>
            </div>
        )
    }

    

    render() {
        
        return (
            <div>
                <div>
                    {this.filterQuestions()}
                </div>
            </div>
        )
    }
}

export default SearchIndexItem