import React from 'react';
import {Link} from 'react-router-dom';
import './css/search_index.scss';
 

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
            <div>
                {Object.values(this.filteredQuestions).map(question => (
                    <div>{question.title}</div>
                ))}
            </div>
        )
    }

    

    render() {
        debugger
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