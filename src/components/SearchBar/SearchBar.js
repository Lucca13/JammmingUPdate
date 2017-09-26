/* SearchBar component takes input from page to search Spotify for the given term.
Handels the change of status in the input and passes to the App component to be passed
to Spotify object method to perform the search. */
// importing the React class object and stylesheet
import React from 'react';
import './SearchBar.css';

export default class SearchBar extends React.Component {
  /* constructor to receive the propterties passed to the component, declaration of the state,
and the binding of the states of 'this' to the component calls. */
  constructor(props) {
    super(props);

    this.state = {
      term: ''
    };
    this.handleTermChange = this.handleTermChange.bind(this);
    this.searchIt = this.searchIt.bind(this);
  }
  // event handler for changes to the search string from the input call.
  handleTermChange(event) {
    this.setState({term: event.target.value});
  }
  // method that calls the searchIt method in App - which invokes the Spotify search object method.
  searchIt() {
    this.props.onSearch(this.state.term);
  }
  // renders the html for the search box and button and corresponding eventhandling.
  render() {
    return (
      <div className="SearchBar">
        <input placeholder="Enter A Song, Album, or Artist" onChange={this.handleTermChange}/>
        <a onClick={this.searchIt} className="searchBTN">SEARCH</a>
      </div>
    );
  }
}
