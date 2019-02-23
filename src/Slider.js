import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './App.css';

const style = { width: '80%', margin: '7%' }
const soundcloudStyle = { height: '80%' }

const styleSlider = { 
    WebkitAppearance: "none",
    width: "100%",
    height: "6px",
    borderRadius: "5px", 
    background: "#d3d3d3",
    outline: "none",
    opacity: "0.7",
    WebkitTransition: "0.2s",
    transition: "opacity 0.2s" }

const styleSliderThumb = { 
    WebkitAppearance: "none",
    appearance : "none",
    width: "25px",
    height: "25px",
    borderRadius: "50%", 
    background: "#4CAF50",
    cursor : "pointer"
}

const styleSliderRangeThumb = { 
    width: "25px",
    height: "25px",
    borderRadius: "50%",
    background: "#4CAF50",
    cursor: "pointer" 
}


class Slider extends Component {
    constructor(props) {
        super(props)
        this.state = {
        hoverVolume: false
        }
        this.mouseEnter = this.mouseEnter.bind(this)
        this.mouseLeave = this.mouseLeave.bind(this)
    }

    mouseEnter() {
        this.setState({ hoverVolume: true })
    }

    mouseLeave() {
        this.setState({ hoverVolume: false })
    }

    render() {
        return (
        <div className="slidecontainer" >
            <input
                type="range" min="0" max="10000" className="slider" id="slider" onChange={this.props.onChange}  />

        </div>
        )
    }
}
  
Slider.propTypes = {
    volumeLevel: PropTypes.number,
    updateVolumeLevel: PropTypes.func,
    styles: PropTypes.object,
  }
  
export default Slider