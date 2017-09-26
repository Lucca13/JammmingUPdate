/* Track component which takes a track and either adds or removes from playlist.
  Renders HTML for display of tracks and the means to add and remove the individual track. */
/* importing react and moment modules, stylesheet, and links the
moment-duration-format plug-in module that formats moment method output */
import React from 'react';
import Moment from 'moment';
import './Track.css';
require("./moment-duration-format");

export default class Track extends React.Component {
  /* contructor that passes the properties to component and binds 'this' for
addTrack and removeTrack methods */
  constructor(props) {
    super(props);

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
  }
// addTrack method adds the given track to playlist when triggered.
  addTrack(event) {
    this.props.onAdd(this.props.track);
  }
// removeTrack method removes the given track from the playlist when triggered.
  removeTrack(event) {
    this.props.onRemove(this.props.track);
  }
/* renderAction method adds the HTML to the track information based
on whether track can be added or removed. */
  renderAction() {
    if (this.props.isRemoval) {
      return <a className="Track-action" onClick={this.removeTrack}>-</a>;
    }
    return <a className="Track-action" onClick={this.addTrack}>+</a>;
  }
/* component render method that generates the HTML to display the track information
and appropriate means to indicate the track to add or to remove from the revalant list. */
  render() {
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{this.props.track.name}</h3>
          <p>{this.props.track.artist}
            | {this.props.track.album}
            | Play time: {Moment.duration(1000, "seconds").format("h:mm:ss")}</p>
        </div>
        {this.renderAction()}
      </div>
    );
  }
}
