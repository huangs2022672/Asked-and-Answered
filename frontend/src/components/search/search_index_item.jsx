import React from 'react';

class SearchIndexItem extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            term: ""
        }

        this.filterQuestions = this.filterQuestions.bind(this);
    }

    componentDidMount(){
        this.props.fetchAllQuestions()
    }

    filterQuestions(){
        if (!this.props.questions) {
            return null;
        }
        if (this.props.location) {
            this.setState.term = this.props.location.state.searchContent;
        }
        debugger
        let filteredQuestions = []
        let searchTerms = this.props.match.params.query.split(" ");
        searchTerms.forEach( searchTerm => {
            (this.props.questions.forEach( question => {
                if (question.title.includes(searchTerm) || question.body.includes(searchTerm)) {
                    filteredQuestions.push(question)
                }
            })
        )})
        debugger
        return (
            filteredQuestions.forEach(question => {
                return question.title
            })
            
        )
    }

    render() {
        
        return (
            <div>
                hello
               {this.filterQuestions()} 
            </div>
        )
    }
}

export default SearchIndexItem