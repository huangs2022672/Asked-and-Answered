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
        debugger
        return (
            <div>
                <form>
                    <input type="text" value={this.state.searchContent} onChange={this.updateText("searchContent")}/> 
                    <Link to={`questions/search/${this.state.searchContent}` } >
                        <button>Submit</button> 
                    </Link>
                </form>
            </div>
        )
    }
}

export default Search;