import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import SongTable from './SongTable';
import { 
  SONG_TABLE_CB_ENUMS,
} from './SongTable';


const LFM_API = process.env.REACT_APP_LFM_API;

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      songProgress: 0.0,
      volume: 1.0,
      isPlaying: false,
      songIndex: 0,
      songDuration: 0,
      songCurrTime: 0,
      songs : [],
      artistName: "",
      artistBio: "",
      artistTags: [],
      artistImage: "",
      artistSimilar: [],
      artistTopSongs: []
    }

    //this.onPlayDown = this.onPlayDown.bind(this);
    //this.loadAnother = this.loadAnother.bind(this);
  }

  componentDidMount() {
    let url = "http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=Cher&api_key=" + LFM_API + "&format=json"
    /*
    fetch(url).then(response => {
        return response.json();
      }).then(data => {
        console.log(data);
        let name = data.artist.name;
        //console.log(name);
        let bio = data.artist.bio.summary;
        let tags = data.artist.tags.tag;
        let image = data.artist.image[data.artist.image.length-1];
        let similar = data.artist.similar.artist;
        this.setState({artistName: name, artistBio: bio, artistTags: tags, artistImage: image, artistSimilar: similar});
      }).catch(err => {
        // What do when the request fails
        this.setState({artistName: "Request Error"});
        console.log('The request failed!!!! ' + err); 
      });
      */

      let urlTopSongs = "http://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=cher&api_key=" + LFM_API + "&limit=20&format=json"
      fetch(urlTopSongs).then(response => {
          return response.json();
        }).then(data => {
          console.log(data);
          let top = data.toptracks.track;
          this.setState({artistTopSongs: top});
        }).catch(err => {
          // What do when the request fails
          this.setState({artistName: "Request Error"});
          console.log('The request failed!!!! ' + err); 
        });

    //this.setState({songs: songs});
  }

  callbackHandler = (type, data) => {
    console.log("callbackHandler " + type)
    switch(type) {
      case SONG_TABLE_CB_ENUMS.PLAY:
      console.log("play " + data.id)
      this.onPlayFromTable(data.id);
      break;
      /*
      case CALLBACK_ENUMS.PLAY:
      // manipulate data if required
      //this.props.callbackHandler(type, data);
      console.log("play " + data)
      this.onPlayDown();
      break;
    case CALLBACK_ENUMS.PREV:
      this.onPrevDown();
      break;
    case CALLBACK_ENUMS.NEXT:
      this.onNextDown();
      break;
    case CALLBACK_ENUMS.END:
      this.onSongEnded();
      break;
    */
    default:
      // bubble up all other actions to parent
      //this.props.callbackHandler(type, data);
    }
  }

  render() {
    return (
      <div className="App" style={{height: "60px"}}>
        <header className="App-header">
          <img height="60px" src={logo} className="App-logo" alt="logo" />
          <h1 style={{}}>React Museek</h1> 
          
        </header>
        <div className="Content" style={{backgroundColor: "#282c34"}}>
          <div className="Top">
            <div className="Bio">
            <h2 > {this.state.artistName} </h2>
            Drum And Bass / Dubstep / Electronic / Drumstep / Dnb
              <p>
              {this.state.artistBio} 
              </p>
            </div>
            <div className="Player">
            <iframe width="100%" src="https://www.youtube.com/embed/71rSc6LXlSo" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
          </div>

          <div className="Bot">
            <div className="SongTable">
              <SongTable songs={this.state.artistTopSongs} callbackHandler={this.callbackHandler}></SongTable>
            </div>
            <div className="Similar">
              <p>
                Edit <code>src/App.js</code> and save to reload.
              </p>
            </div>
          </div>
        </div>


      </div>
    );
  }
}

export default App;
