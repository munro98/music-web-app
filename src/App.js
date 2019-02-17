import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import SongTable from './SongTable';
import { 
  SONG_TABLE_CB_ENUMS,
} from './SongTable';

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
      songs : []
    }

    //this.onPlayDown = this.onPlayDown.bind(this);
    //this.loadAnother = this.loadAnother.bind(this);
  }

  componentDidMount() {
    let songs = [{name: "The Tunnel", artists: ["Snow Dayy"]}, {name: "One ft. Holly Drummond (Virtual Riot 2017 Remix)", artists: ["Submatik"]}];
    this.setState({songs: songs});
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
          <h1 style={{}}> WebAMuseek </h1> 
          
        </header>
        <div className="Content" style={{backgroundColor: "#282c34"}}>
          <div className="Top">
            <div className="Bio">
            <h2 > Muzzy </h2>
            Drum And Bass / Dubstep / Electronic / Drumstep / Dnb
              <p>
              There are several artists under the name Muzzy. (1) Mustafa 'Muzzy' Alobaidi is a Dubstep/DNB artist from Hampshire, UK. He started getting recognition when he was only 14-15 years old. http://www.youtube.com/muzzy654 http://soundcloud.com/muzzydnb (2) Muzzy is musician living in Yunnan, China. Free tracks can be downloaded via Douban. www.douban.com/artist/Muzzy/ www.myspace.cn/muzzy (3) Muzzy Spends too much time playing in Garageband and not doing the dishes. Read more on Last.fm
              </p>
            </div>
            <div className="Player">
            <iframe width="100%" src="https://www.youtube.com/embed/71rSc6LXlSo" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
          </div>

          <div className="Bot">
            <div className="SongTable">
              <SongTable songs={this.state.songs} callbackHandler={this.callbackHandler}></SongTable>
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
