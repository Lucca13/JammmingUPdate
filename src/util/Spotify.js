/* Spotify object consists of the method used to establish the secure
connection to the Spotify website and retrieve the requested search
information and send it back to the App component. */
// Spotify API client access and the urls used in called searches.
const clientId = 'c22ca15fc973454caf7a62cc8eabcce1';
const redirectURI = 'http://localhost:3000/';
const accessURIBase = 'https://accounts.spotify.com/authorize';
const spotifyURIBase = 'https://api.spotify.com/v1/';

let accessToken;

const Spotify = {
  // method used to get access token to utilize the SpotifyAPI.
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }

    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
    if (accessTokenMatch && expiresInMatch) {
      accessToken = accessTokenMatch[1];
      const expiresIn = Number(expiresInMatch[1]);
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      // Clears the parameters, allowing a new access token to be pulled when it expires.
      window.history.pushState('Access Token', null, '/');
      return accessToken;
    } else {
      const accessURI = `${accessURIBase}?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
      window.location = accessURI;
    }
  },
  /* method that takes the previously genereated Access token and performs search
with the term passed from the App component. */
  searchIt(term) {
    const accessToken = Spotify.getAccessToken();
    return fetch(`${spotifyURIBase}search?type=track&q=${term}`, { // retrival of the info for the term supplied.
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }
  ).then(response => { return response.json(); }
  ).then(jsonResponse => { // parsing of the retreived data into json objects.
      if (!jsonResponse.tracks) {
        return [];
      }
/* picking of the json data and assigning to track object. */
      return jsonResponse.tracks.items.map(track => ({
        id: track.id,
        name: track.name,
        length: track.duration_ms,
        image: track.album.images[2],
        artist: track.artists[0].name,
        album: track.album.name,
        uri: track.uri
      }));
    });
  },
  /* method that takes the given playlist and saves to the users Spotify account. */
  savePlayList(name, trackUris) {
    if (!name || !trackUris.length) {
      return;
    }
    //  using the POST method send the id of the tracks in a list to the users Spotify account.
    const accessToken = Spotify.getAccessToken();
    const headers = {
      Authorization: `Bearer ${accessToken}`
    };
    let userId;
    return
    fetch(`${spotifyURIBase}me`, {headers: headers}).then(response => response.json()).then(jsonResponse => {
      userId = jsonResponse.id;
      return
      fetch(`${spotifyURIBase}users/${userId}/playlists`, {
        headers: headers,
        method: 'POST',
        body: JSON.stringify({name: name})
      }).then(response => response.json()).then(jsonResponse => {
        const playListId = jsonResponse.id;
        return
        fetch(`${spotifyURIBase}users/${userId}/playlists/${playListId}/tracks`, {
          headers: headers,
          method: 'POST',
          body: JSON.stringify({uris: trackUris})
        });
      });
    });
  }
};

export default Spotify;
