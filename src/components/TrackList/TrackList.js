/* TrackList component calls the Track component to render
 the HTML for the list of tracks. It passes the props needed by
 Track to display the given track. */
// importing the react class and track component with the accompaning stylesheet.
import React from 'react';
import './TrackList.css';
import Track from '../Track/Track.js';

export default class TrackList extends React.Component {
/* TrackList render method used to go through a list of supplied list of 
tracks and pass the info to the Track component to display. */
  render() {
    return (
      <div className="TrackList">
        {
          this.props.tracks.map(track => {
            return <Track
            key={track.id}
            track={track}
            onAdd={this.props.onAdd}
            isRemoval={this.props.isRemoval}
            onRemove={this.props.onRemove} />;
          })
        }
      </div>
    );
  }
}
