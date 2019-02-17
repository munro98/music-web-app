import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './App.css';


// list of all possible enums in child
const VIEW_CALLBACK_ENUMS = {
    CLICK: 'SIMILAR_ARISTS/CLICK',
  };

const divStyle = {
    width: "100%",
    height: "100%",
    bottom: "100px",
    overflowY: "scroll"

};

const stylePlayerButton = {width: "40px", height: "40px", background: "transparent", border: "0", outline: "none"}

class SimilarArtistsTable extends Component {
    constructor(props) {
        super(props)
        this.onClickArtist = this.onClickArtist.bind(this);
    }

    componentDidMount() {

    }

    onClickArtist(e) {
        let id = e.currentTarget.getAttribute('artist_list_ind');
        console.log("play " + e.currentTarget + " "+ id);


        this.props.callbackHandler(
            VIEW_CALLBACK_ENUMS.CLICK,
            {id : id});
    }

    render() {

        let list = this.props.similarArtists;

        let items = list.map( (val, i) =>
            <tr key={i}>
                <td>
                <button id="play-button" style={stylePlayerButton} onClick={this.onClickArtist} artist_list_ind={i}>
                    <svg id="icon-skip-play" viewBox="0 0 24 24" width="100%" height="100%" style={{fill: "rgb(200, 200, 200)"}}>
                        <path d="M 17.488289,12 4.3498907,3.6967476 V 20.303252 Z"></path>
                        <path d="M0 0h24v24H0z" fill="none"></path>
                    </svg>
                </button>
                </td>
                <td>{val.name + " " + i}</td>
                <td><a href="www">{val.name + " " + i}</a></td>
            </tr>

        );
        return (
            <div style={divStyle}>
            <table id="similar-artists">
                <tbody>
                <tr>
                    <th>Similar Artists</th>
                    <th></th>
                    <th></th>
                </tr>
                {items}
                </tbody>
            </table>
            
            </div>
        )
    }
}

export default SimilarArtistsTable
export {
    VIEW_CALLBACK_ENUMS as SIMILAR_ARTISTS_TABLE_CB_ENUMS,
  };
