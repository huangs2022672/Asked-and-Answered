import React from 'react';

class SearchIndexItem extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            term: ""
        }
        this.filteredQuestions = {}
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
        // debugger
        return (
            <div>
                {Object.values(this.filteredQuestions).map(question => (
                    <div>{question.title}</div>
                ))}
            </div>
        )
    }

    render() {
        
        return (
            <div>
                Hello
                <div>
                    {this.filterQuestions()}
                </div>
            </div>
        )
    }
}

export default SearchIndexItem