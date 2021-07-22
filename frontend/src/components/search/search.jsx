import React from 'react';
import { Redirect, Link } from 'react-router-dom';

class Search extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            searchContent: ""
        }

    }


    updateText(field){
       return e => (this.setState({ [field]: e.currentTarget.value }))
    }

    render() {
        return (
            <div>
                <input type="text" value={this.state.searchContent} onChange={this.updateText("searchContent")}/> 
                <Link to={`questions/search/${this.state.searchContent}` } >
                    <button>Submit</button> 
                </Link>
            </div>
        )
    }
}

export default Search;