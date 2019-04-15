import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './App.css';

const LFM_API = process.env.REACT_APP_LFM_API;

// list of all possible enums in child
const VIEW_CALLBACK_ENUMS = {
    PLAY: 'SONG_TABLE/PLAY',
  };

const divStyle = {
    width: "100%",
    height: "100%",
    bottom: "100px",
    //overflowY: "scroll"
};

const stylePlayerButton = {width: "40px", height: "40px", background: "transparent", border: "0", outline: "none"}

class SongTable extends Component {
    constructor(props) {
        super(props)
        this.onPlayDown = this.onPlayDown.bind(this);
    }

    onPlayDown(e) {
        let id = e.currentTarget.getAttribute('song_id');
        let songName = e.currentTarget.getAttribute('song_name');
        console.log("play " + e.currentTarget + " "+ id);

        this.props.callbackHandler(
            VIEW_CALLBACK_ENUMS.PLAY,
            {songName : songName});
    }

    render() {
        let list = this.props.songs;
        let items = list.map( (val, i) =>
            <tr key={i}>
                <td>
                <button id="play-button" style={stylePlayerButton} onClick={this.onPlayDown} song_id={i} song_name={val.name}>
                    <svg id="icon-skip-play" viewBox="0 0 24 24" width="100%" height="100%" style={{fill: "rgb(200, 200, 200)"}}>
                        <path d="M 17.488289,12 4.3498907,3.6967476 V 20.303252 Z"></path>
                        <path d="M0 0h24v24H0z" fill="none"></path>
                    </svg>
                </button>
                </td>
                <td>{i + "  " + val.name }</td>
                <td></td>
            </tr>
        );

        return (
            <div style={divStyle}>
            <table id="songs">
                <tbody>
                <tr>
                    <th></th>
                    <th>Top Songs</th>
                    <th></th>
                </tr>
                {items}
                </tbody>
            </table>
            
            </div>
        )
    }
}

export default SongTable

export {
    VIEW_CALLBACK_ENUMS as SONG_TABLE_CB_ENUMS,
  };
