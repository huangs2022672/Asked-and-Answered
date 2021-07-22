import React from 'react';

class Search extends React.Component {
    constructor(props){
        super(props)
    }

    handleSubmit(){
        
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" /> 
                    <button>Submit</button>
                </form>
            </div>
        )
    }
}

export default Search;