import React from 'react';
import AnswersIndexContainer from '../answers/answers_index_container';
import QuestionIndexItemContainer from '../questions/questions_index_item_container'

import './css/search_index_item.scss'

class SearchIndexItem extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            term: ""
        }
        this.filteredQuestions = {}
        this.query = this.props.match.params.query
    }

    componentDidMount(){
        this.props.fetchAllQuestions()
        this.offQuestionShow()
    }

    offQuestionShow(){
        if (this.props.questionShow){
            this.props.questionShowStatus()
        }
    }
    filterQuestions(){
        if (!this.props.questions) {
            return null;
        }
        let searchTerms = this.query.split(" ");
        searchTerms.forEach( searchTerm => {
            (this.props.questions.forEach( question => {
                if ((question.title.includes(searchTerm) || question.body.includes(searchTerm)) && !this.filteredQuestions[question._id]) {
                    this.filteredQuestions[question._id] = question
                }
            })
        )})
        return (
            <div>
                {Object.values(this.filteredQuestions).map(question => (
                    <div>
                        <QuestionIndexItemContainer
                            question={question} 
                            users={this.props.users}
                            key={`question-${question._id}`}
                        />
                    </div>
                ))}
            </div>
        )
    }

    render() {
        const {questionShow, users} = this.props
        return (
            <div className='search-result-container'>
                <h1>Search Result for "{this.query}"</h1>
                <div className="question__index">
                    <div className="questions-index-main">
                        {this.filterQuestions()}
                    </div>
                    { questionShow ? (
                    <div className="questions__index__show">
                        <div>
                            <AnswersIndexContainer users={users}/>
                        </div>
                    </div>
                    ) : null}
                </div>
            </div>
        )
    }
}

export default SearchIndexItem