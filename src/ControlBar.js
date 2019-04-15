import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './App.css';

import Slider from './Slider';

// list of all possible enums in child
const VIEW_CALLBACK_ENUMS = {
    PLAY: 'ControlBar/PLAY',
    PAUSE: 'ControlBar/PAUSE',
    NEXT: 'ControlBar/NEXT',
    PREV: 'ControlBar/PREV',
    END: 'ControlBar/END',
    VOLUME_CHANGE: 'ControlBar/VOLUME_CHANGE',
    SEEK_CHANGE: 'ControlBar/SEEK_CHANGE',
    SEEK_UP: 'ControlBar/SEEK_UP'
  };

const styleFlex = {display: "flex",
    height: "100%",
    backgroundColor: "rgb(39, 39, 39)",
    //background: "transparent",
};

const styleDiv = {
    //backgroundColor: "rgb(39, 39, 39)",
    //background: "transparent",
    width : "100%",
    //margin: "10px",
    //padding: "20px",
};

const styleDiv2 = {
    //backgroundColor: "rgb(39, 39, 39)",
    background: "transparent",
    flex : "70%",
    width : "100%",
};

const timeElapsedSyle = {
    fontFamily: "monospace, monospace",
}

const stylePlayerButton = {width: "40px", height: "40px", background: "transparent", border: "0", outline: "none"}

class ControlBar extends Component {
    constructor(props) {
        super(props)

        this.onSongEnded = this.onSongEnded.bind(this);

        this.onSongSeekChange = this.onSongSeekChange.bind(this);
        this.onVolumeChange = this.onVolumeChange.bind(this);
        this.onPlayDown = this.onPlayDown.bind(this);

        this.onPrevDown = this.onPrevDown.bind(this);
        this.onNextDown = this.onNextDown.bind(this);

    }

    onSongEnded() {
        this.props.callbackHandler(
            VIEW_CALLBACK_ENUMS.END,
            "");
    }

    onSongSeekChange(e) {
        let newProgress = e.target.value/10000.0;
        //this.setState({songProgress : newProgress});
        //console.log(newProgress);
        this.props.callbackHandler(
            VIEW_CALLBACK_ENUMS.SEEK_CHANGE,
            {value : newProgress});
    }

    onSongSeekUp(e) {
        let newProgress = e.target.value/10000.0;
        this.props.callbackHandler(
            VIEW_CALLBACK_ENUMS.SEEK_SEEK_UP,
            {value : newProgress});
    }

    onVolumeChange(e) {
        let newProgress = e.target.value/10000.0;
        this.props.callbackHandler(
            VIEW_CALLBACK_ENUMS.VOLUME_CHANGE,
            {value : newProgress});
        //this.setState({volume : newProgress});
    }

    onPlayDown(e) {
        this.props.callbackHandler(
            VIEW_CALLBACK_ENUMS.PLAY,
            "");
    }

    onPrevDown(e) {
        this.props.callbackHandler(
            VIEW_CALLBACK_ENUMS.PREV,
            "");
    }

    onNextDown(e) {
        this.props.callbackHandler(
            VIEW_CALLBACK_ENUMS.NEXT,
            "");
    }

    secondsToMMSS(s) {
        s = Math.floor(s);
        let m = Math.floor(s / 60);
        let secs = Math.floor(s % 60);
        return ""+m+":"+secs;
    }

    /*
            <img 
            style={albumStyle}
            src="albumPlaceHolder.jpg" 
            alt="Album Art"
            height="100px"
            width="100px" />
    */

    render() {
        return (
            <div style={styleFlex}  className="flex-container">
            <div style={styleDiv2} >
            <div>
            
            <div style={{float: "left", width : "100px", margin: "0px"}}>
            
            </div>

            <div style={{float : "left", margin: "16px", color: "rgb(240, 240, 240)"}}>
            <span > <a style={{color: "rgb(200, 200, 200)"}} href={
                    this.props.activeArtist === "" ? "/" : "?artist="+this.props.activeArtist
                    }> {this.props.activeArtistName} </a> </span>
            <br></br>
            <span style={{color: "rgb(240, 240, 240)"}}>{this.props.activeSongName}</span>
            
            
            </div>
            </div>
            </div>
            <div style={styleDiv}> 
                <div style={{ width: "240px",height: "50px",marginTop: "16px", marginLeft: "auto", marginRight: "auto", columnCount: 5/*, backgroundColor: "rgb(255, 0, 0)"*/}}> 
                    <div><center>
                    
                        <button id="play-button" style={stylePlayerButton} onClick={this.onPrevDown}>
                            <svg id="icon-skip-previous" viewBox="0 0 24 24" width="100%" height="100%" style={{fill: "rgb(200, 200, 200)"}}>
                                <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"></path>
                                <path d="M0 0h24v24H0z" fill="none"></path>
                            </svg>
                        </button>
                        
                    </center></div>
                    <div><center> 
                        
                        <button id="play-button" style={stylePlayerButton} onClick={this.onPlayDown}>
                            <svg id="icon-skip-play" viewBox="0 0 24 24" width="100%" height="100%" style={{fill: "rgb(200, 200, 200)"}}>
                                <path d="M 17.488289,12 4.3498907,3.6967476 V 20.303252 Z"></path>
                                <path d="M0 0h24v24H0z" fill="none"></path>
                            </svg>
                        </button>
                        
                         </center></div>
                    <div><center>

                    <button id="play-button" style={stylePlayerButton} onClick={this.onNextDown}>
                        <svg id="icon-skip-next" viewBox="0 0 24 24" width="100%" height="100%" style={{fill: "rgb(200, 200, 200)"}}>
                            <path d="M 18,18 H 16 V 6 h 2 z M 14.5,12 6,6 v 12 z"></path>
                            <path d="M0 0h24v24H0z" fill="none"></path>
                        </svg>
                    </button>
                        
                    </center></div>
                </div>
            
                
                <div style={{ height: "50px", marginTop: "0px", marginLeft: "auto", marginRight: "auto"/*, backgroundColor: "rgb(255, 0, 0)"*/}}> 
                    <div style={{ marginTop: "2px", width: "44px", float: "left", fontFamily: "monospace, monospace", background: "transparent"}}>{this.secondsToMMSS(this.props.time)}</div>
                    <div style={{ marginTop: "2px", width: "44px", float: "right", fontFamily: "monospace, monospace", background: "transparent"}}>{this.secondsToMMSS(this.props.duration)}</div>
                    <div style={{marginLeft: "48px", marginRight: "50px"}}><Slider onChange={this.onSongSeekChange}></Slider></div>
                </div>


                </div>
            <div style={styleDiv2}>
                <div style={{width: "140px",height: "50px",float: "right"}}>
                    <div style={{ width: "140px",height: "50px", float: "right", marginTop: "16px", marginRight: "16px", columnCount: 3/*, backgroundColor: "rgb(255, 0, 0)"*/}}> 
                        <div><center>1</center></div>
                        <div><center>2</center></div>
                        <div><center>3</center></div>
                    </div>
                    <div style={{ width: "140px",marginTop: "0px", marginRight: "16px", float: "right"}}>
                    <Slider onChange={this.onVolumeChange}></Slider>
                    </div>
                </div>
            </div>
          </div>
        )
    }
}

export default ControlBar

export {
    VIEW_CALLBACK_ENUMS as ControlBar_CB_ENUMS,
  };