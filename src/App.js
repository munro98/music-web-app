import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import QueryString from 'query-string';

import SongTable from './SongTable';
import { 
  SONG_TABLE_CB_ENUMS,
} from './SongTable';

import ControlBar from './ControlBar';
import { 
  ControlBar_CB_ENUMS,
} from './ControlBar';

import YTEmbeded from './YTEmbeded';
import { 
  YTEmbeded_CB_ENUMS,
} from './YTEmbeded';

import SimilarArtistsTable from './SimilarArtistsTable';
import { 
  SIMILAR_ARTISTS_TABLE_CB_ENUMS,
} from './SimilarArtistsTable';

/*
Add link for lastFM page
Play next song when one is finished
Make the < > do stuff

fix terrible UI

*/

const LFM_API = process.env.REACT_APP_LFM_API;
const YT_API = process.env.REACT_APP_YT_API;

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      volume: 1.0,
      isPlaying: false,
      songIndex: 0,
      songDuration: 0,
      songCurrTime: 0,
      songProgress: 0.0,
      activeArtistName: "None selected",
      activeArtist: "None selected",
      activeSongName: "None selected",
      artistName: "",
      artistBio: "",
      artistTags: [],
      artistImage: "",
      artistSimilar: [],
      artistTopSongs: [],
      suggestions: [],
      ytId: "71rSc6LXlSo"
    }

    this.ytPlayer = React.createRef();
    this.currentFocus = undefined;
    //this.suggestions = ["aaaaa","bbbbb","ccccc"];

    //this.onPlayDown = this.onPlayDown.bind(this);
    //this.loadAnother = this.loadAnother.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.searchArtist = this.searchArtist.bind(this);
    this.closeAllLists = this.closeAllLists.bind(this);
    this.addActive = this.addActive.bind(this)
  }

  componentDidMount() {

    const parsed = QueryString.parse(window.location.search);
    console.log(parsed);

    let artistParam = "cher";
    if (parsed.search) {
      artistParam = parsed.search;
    }

    let url = "http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=" + artistParam + "&api_key=" + LFM_API + "&format=json" //C%C3%A9line+Dion
    ///*
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
        this.setState({artistName: "Request Error"});
        console.log('The request failed!!!! ' + err); 
      });
      //*/

      let urlTopSongs = "http://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=" + artistParam + "&api_key=" + LFM_API + "&limit=20&format=json"
      fetch(urlTopSongs).then(response => {
          return response.json();
        }).then(data => {
          console.log(data);
          let top = data.toptracks.track;
          this.setState({artistTopSongs: top});
        }).catch(err => {
          this.setState({artistName: "Request Error"});
          console.log('The request failed!!!! ' + err); 
        });

  }

  callbackHandler = (type, data) => {
    console.log("callbackHandler " + type)
    switch(type) {
      case SONG_TABLE_CB_ENUMS.PLAY:
      console.log("play " + data.songName)
      
      this.onPlayFromTable(data.songName);
      break;
      case ControlBar_CB_ENUMS.PLAY:
      this.ytPlayer.current.playVideo();
      // manipulate data if required
      //this.props.callbackHandler(type, data);
      console.log("play " + data)
      //this.onPlayDown();
      break;
      case ControlBar_CB_ENUMS.VOLUME_CHANGE:
      this.ytPlayer.current.setVolVideo(data);
      break;
      case ControlBar_CB_ENUMS.SEEK_CHANGE:
      this.ytPlayer.current.setVolVideo(data);
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

  onPlayFromTable(songName) {

    let imeBenda = this.state.artistName.replace(/&/g, '%26');
    let imePesme = songName.replace(/&/g, '%26');
    let url = "https://www.googleapis.com/youtube/v3/search?videoDefinition=any&part=snippet&videoEmbeddable=true&q="
			  + imeBenda + "+" + imePesme + "&part=contentDetails&type=video&maxResults=10&key=" + YT_API;
    fetch(url).then(response => {
        return response.json();
      }).then(data => {
        console.log(data);
        let vID = data.items[0].id.videoId;
        console.log(vID);

        this.ytPlayer.current.playNewVideo(vID)

        if (true) {
          this.setState({activeArtistName: this.state.artistName, activeSongName: songName});
        }

        //this.setState({ytId: vID});
        //this.setState({artistTopSongs: top});
      }).catch(err => {
        this.setState({artistName: "YT Request Error"});
        console.log('The request failed!!!! ' + err); 
      });

  }

  searchArtist(str) {
    let imePesme = str.replace(/&/g, '%26');
    let url = "http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=" + imePesme + "&api_key=" + LFM_API + "&limit=20&format=json"

    let suggestions = [];
    fetch(url).then(response => {
        return response.json();
      }).then(data => {
        console.log(data);

        ///*
        data.results.artistmatches.artist.forEach((artist) => {suggestions.push(artist.name)})
        this.setState({suggestions: suggestions});
        //*/

      }).catch(err => {
        console.log('The request failed!!!! ' + err); 
      });

  }

  onSearchChange(e) {
    console.log(e.currentTarget.value);//koan sound
    this.searchArtist(e.currentTarget.value);

    let a, b, i, val = e.currentTarget.value.toLowerCase();
    let inputEl = e.currentTarget;
    let self = this;
      /*close any already open lists of autocompleted values*/
      this.closeAllLists();
      if (!val) { return false;}
      this.currentFocus = -1;

      a = document.createElement("DIV");
      a.setAttribute("id", "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");
      e.currentTarget.parentNode.appendChild(a);
      for (i = 0; i < this.state.suggestions.length; i++) {
        if (this.state.suggestions[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {

          b = document.createElement("DIV");

          b.innerHTML = "<strong>" + this.state.suggestions[i].substr(0, val.length) + "</strong>";
          b.innerHTML += this.state.suggestions[i].substr(val.length);

          b.innerHTML += "<input type='hidden' value='" + this.state.suggestions[i] + "'>";

              b.addEventListener("click", function(e) {
                inputEl.value = this.getElementsByTagName("input")[0].value;
              /*close the list of autocompleted values,*/
              self.closeAllLists();
          });
          a.appendChild(b);
        }
      }


  }

  addActive(x) {

    if (!x) return false;
    this.removeActive(x);
    if (this.currentFocus >= x.length) this.currentFocus = 0;
    if (this.currentFocus < 0) this.currentFocus = (x.length - 1);
    x[this.currentFocus].classList.add("autocomplete-active");
  }
  removeActive(x) {
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }

  closeAllLists(elmnt) {
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != document.getElementById("search")) {
      x[i].parentNode.removeChild(x[i]);
    }
  }
  }

  
  render() {

    let tags = this.state.artistTags.map( (val, i) =>
      <a key={i} style={{color: "rgb(240, 240, 240)"}} href="www">
      {val.name + " "}
      </a>
    );

    return (
      <div className="App" style={{height: "60px"}}>
        <header className="App-header">
          
          <img  height="60px" src={logo} style={{float: "left", marginTop: "auto", marginBottom: "auto"}} className="App-logo" alt="logo" />
          <h1 style={{float: "left", margin: "0px", fontSize: "40px"}}>React Museek</h1>

          <form autocomplete="off" action="/">
          <div style={{float: "right", marginTop: "auto", marginBottom: "auto", marginLeft: "16px", marginRight: "16px"}} class="autocomplete">
            <input style={{border: "none",fontSize: "17px", padding: "6px", marginTop: "auto", marginBottom: "auto"}} id="search" type="text" name="search" placeholder="Artist.." onChange={this.onSearchChange}></input>
            <input style={{border: "none",fontSize: "17px", padding: "6px", marginTop: "auto", marginBottom: "auto"}} type="submit" value="Search"></input>
          </div>
          
          </form>

          
        </header>
        <div className="Content" style={{backgroundColor: "#282c34"}}>

          <div className="Top" style={{display: "flex", flexWrap: "wrap"}}>
            <div className="Bio" style={{flex: "50%", padding: "16px"}}>
            <h2 style={{color: "rgb(240, 240, 240)"}}> {this.state.artistName} </h2>
            <p style={{color: "rgb(240, 240, 240)"}}>
            {tags}
            </p>
              <p style={{color: "rgb(240, 240, 240)"}}>
              {this.state.artistBio} 
              </p>
            </div>
            <div className="Player" style={{flex: "50%", padding: "16px"}}>
              <YTEmbeded ref={this.ytPlayer} YTid={this.state.ytId} callbackHandler={this.callbackHandler}> </YTEmbeded>

            </div>
          </div>

          <div className="Bot" style={{display: "flex", flexWrap: "wrap"}}>
            <div className="SongTable" style={{flex: "50%", padding: "16px"}}>
              <SongTable songs={this.state.artistTopSongs} callbackHandler={this.callbackHandler}></SongTable>
            </div>
            <div className="Similar" style={{flex: "50%", padding: "16px"}}>
            <SimilarArtistsTable similarArtists={this.state.artistSimilar} callbackHandler={this.callbackHandler}></SimilarArtistsTable>
            
            </div>
          </div>
        </div>
        <ControlBar callbackHandler={this.callbackHandler} activeArtist={this.state.activeArtist} activeArtistName={this.state.activeArtistName} activeSongName={this.state.activeSongName}> </ControlBar>
      </div>
    );
  }
}

export default App;
