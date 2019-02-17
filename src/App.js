import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App" style={{height: "60px"}}>
        <header className="App-header">
          <img height="60px" src={logo} className="App-logo" alt="logo" />
          <h1 style={{}}> Web Muse </h1> 
          
        </header>
        <div className="Content">
          <div className="Top">
            <div className="Bio">
            <h2 > Muzzy </h2>
            Drum And Bass / Dubstep / Electronic / Drumstep / Dnb
              <p>
              There are several artists under the name Muzzy. (1) Mustafa 'Muzzy' Alobaidi is a Dubstep/DNB artist from Hampshire, UK. He started getting recognition when he was only 14-15 years old. http://www.youtube.com/muzzy654 http://soundcloud.com/muzzydnb (2) Muzzy is musician living in Yunnan, China. Free tracks can be downloaded via Douban. www.douban.com/artist/Muzzy/ www.myspace.cn/muzzy (3) Muzzy Spends too much time playing in Garageband and not doing the dishes. Read more on Last.fm
              </p>
            </div>
            <div className="Player">
            <iframe width="560" height="315" src="https://www.youtube.com/embed/71rSc6LXlSo" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
          </div>

          <div className="Bot">
            <div className="Bio">
              <p>
                Edit <code>src/App.js</code> and save to reload.
              </p>
            </div>
            <div className="Player">
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
