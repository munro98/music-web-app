import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './App.css';
import logo from './logo.svg';

// list of all possible enums in child
const VIEW_CALLBACK_ENUMS = {
    CLICK: 'SIMILAR_ARISTS/CLICK',
  };

const divStyle = {
    width: "100%",
    height: "100%",
    bottom: "100px",
    //overflowY: "scroll"
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
                <td><img height="40px" src={val.image[val.image.length-1][Object.keys(val.image[val.image.length-1])[0]]} alt="artist" /></td>
                <td><a href="www">{val.name + " " + i}</a></td>
            </tr>

        );
        return (
            <div style={divStyle}>
            <table id="songs">
                <col width="66"></col>
                <tbody>
                <tr>
                    <th></th>
                    <th>Similar Artists</th>
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
