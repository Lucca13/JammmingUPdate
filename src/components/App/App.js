
// Importing the other components and stylesheets.
import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar.js';
import SearchResults from '../SearchResults/SearchResults.js';
import PlayList from '../PlayList/PlayList.js';
import Spotify from '../../util/Spotify.js';

export default class App extends React.Component {
  // constructor for App declaring the App state variables
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      playListName: 'New PlayList',
      playListTracks: []
    };
    // Bindings for the this states of all the components.
    this.searchIt = this.searchIt.bind(this);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlayListName = this.updatePlayListName.bind(this);
    this.savePlayList = this.savePlayList.bind(this);
  }
  /* method that calls the Spotify searchIt method to retrieve
the list of tracks found with the key word supplied.
I developed this using FireFox Developers Edition browser and originally used
the name search which did not create the this state object and so the setState call would
fail. */
  searchIt(term) {
    Spotify.searchIt(term).then(searchResults => {
      this.setState({searchResults: searchResults});
    });
  }
  /* addTrack method takes an indicated track from the search results and addes to
the playlist. */
  addTrack(track) {
    let tracks = this.state.playListTracks;
    if (!tracks.includes(track)) {
      tracks.push(track);
      this.setState({playListTracks: tracks});
    }
  }
  // removeTrack takes an indicated track in the playlist and removes that track.
  removeTrack(track) {
    let tracks = this.state.playListTracks;

    tracks = tracks.filter(currentTrack => currentTrack.id !== track.id);
    this.setState({playListTracks: tracks});
  }
  // updatePlayListName take a given name and changes the name of the playlist.
  updatePlayListName(name) {
    this.setState({playListName: name});
  }
  // savePlayList takes the constructed play list and adds to the users Spotify account.
  savePlayList() {
    const trackURIs = this.state.playListTracks.map(track => track.uri);
    Spotify.savePlayList(this.state.playListName, trackURIs).then(() => {
      this.setState({playListName: 'New Playlist', playListTracks: []});
    });
  }
  // render the component App HTML and drive the other components with the needed parameters.
  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.searchIt}/>
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>
            <PlayList playListTracks={this.state.playListTracks} onNameChange={this.updatePlayListName} onRemove={this.removeTrack} onSave={this.savePlayList}/>
          </div>
        </div>
      </div>
    );
  }
}
