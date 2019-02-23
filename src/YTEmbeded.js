import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './App.css';


// list of all possible enums in child
const VIEW_CALLBACK_ENUMS = {
    PLAY: 'YTEmbeded/PLAY',
    PAUSE: 'YTEmbeded/PAUSE',
    END: 'YTEmbeded/END',
  };

let loadYT;

class YTEmbeded extends Component {
    constructor(props) {
        super(props)

        this.playVideo = this.playVideo.bind(this);
    }

    componentDidMount() {
        
        if (!loadYT) {
            loadYT = new Promise((resolve) => {
                const tag = document.createElement('script')
                tag.src = 'https://www.youtube.com/iframe_api'
                const firstScriptTag = document.getElementsByTagName('script')[0]
                firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)
                window.onYouTubeIframeAPIReady = () => resolve(window.YT)
            })
            }
            loadYT.then((YT) => {
            this.player = new YT.Player(this.youtubePlayerAnchor, {
                height: this.props.height || 390,
                width: this.props.width || 640,
                videoId: this.props.YTid,
                events: {
                onStateChange: this.onPlayerStateChange
                }
            })
            })
    
    }

    setVideoTime(f){
        //time = duration_slider.noUiSlider.get();
        //player.seekTo(time);
        //player.seekTo(time);
    }

    playNewVideo(vID) {
        this.player.loadVideoById(vID);
    }

    playVideo() {
        this.player.playVideo();
    }
    pauseVideo() {
        this.player.pauseVideo();
    }
    stopVideo() {
        this.player.stopVideo();
    }

    onPlayerStateChange = (e) => {
        console.log(e);
        if (typeof this.props.onStateChange === 'function') {
            this.props.onStateChange(e)
        }
    }

    onSongEnded() {
        this.props.callbackHandler(
            VIEW_CALLBACK_ENUMS.END,
            "");
    }

    onSongSeekChange(e) {
        let newProgress = e.target.value/10000.0;
        this.setState({songProgress : newProgress});
        console.log(newProgress);
    }

    onVolumeChange(e) {
        let newProgress = e.target.value/10000.0;
        this.setState({volume : newProgress});
    }

    onPlayDown(e) {
        this.props.callbackHandler(
            VIEW_CALLBACK_ENUMS.PLAY,
            "");
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
        <section className='youtubeComponentWrapper'>
            <div ref={(r) => { this.youtubePlayerAnchor = r }}></div>
        </section>
        )
    }
}

export default YTEmbeded

export {
    VIEW_CALLBACK_ENUMS as YTEmbeded_CB_ENUMS,
  };