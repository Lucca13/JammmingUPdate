/* SearchResults component passes the object returned from the search and
passes to TrackList component to render to the text scroll box for results. */
// importing react and TrackList component with the stylesheet info.
import React from 'react';
import './SearchResults.css';
import TrackList from '../TrackList/TrackList.js';

export default class SearchResults extends React.Component {
/* render HTML for textbox for the results from the track search
and call TrackList to render the list. */
  render() {
    return (
      <div className="SearchResults">
      <h2 className="resultsMusic">Results</h2>
      <TrackList tracks={this.props.searchResults} onAdd={this.props.onAdd} />
      </div>
    );
  }
}