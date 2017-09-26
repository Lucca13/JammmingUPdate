/* PlayList component that renders the Playlist information, name,
 list of tracks, and the removal of indicated tracks and the modification of the Playlist name. */
// importing the style info and the called tracklist component.
import React from 'react';
import './PlayList.css';
import TrackList from '../TrackList/TrackList.js';

export default class PlayList extends React.Component {
  /* constructor that passes the properties passed to component
 and binds the state of this for the play list name change */
  constructor(props) {
    super(props);

    this.handleNameChange = this.handleNameChange.bind(this);
  }
  // event handler for changes to the playlist.
  handleNameChange(event) {
    this.props.onNameChange(event.target.value);
  }
/* render method that creates HTML for the playlist functions and passes playlist properties to
 tracklist for manipulation of the playlist. */
  render() {
    return (
      <div className="Playlist">
        <input defaultValue={'New Playlist'} onChange={this.handleNameChange}/>
        <TrackList tracks={this.props.playListTracks} isRemoval={true} onRemove={this.props.onRemove}/>
        <a className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</a>
      </div>
    );
  }
}
