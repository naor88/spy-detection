import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import Popup from "reactjs-popup";
import AppHeader from './components/Header';
import PlayerList from './components/PlayerList';
import AvatarGridList from './components/AvatarGridList';

const GameModes = {
  Loading: 'Loading',
  WaitForPlayers: 'WaitForPlayers',
  Playing: 'Playing'
}


class App extends Component {
  constructor() {
    super();
    this.state = {
      gameMode: GameModes.Loading,
      response: false,
      clientID: null,
      players: [],
      endpoint: window.location.host //"http://127.0.0.1:4001" // "http://537a29bc.ngrok.io"//
    };
  }
  componentDidMount() {
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    this.setState({socket});
    window.addEventListener("beforeunload",  (event) => {
        // console.log("hellooww")
        // event.returnValue = "Hellooww"
        socket.emit('Remove', this.state.clientID);
    });
    socket.on("ClientID", data => this.setState({ clientID: data, gameMode: GameModes.WaitForPlayers }));
    socket.on("FromAPI", data => this.setState({ response: data }));
    socket.on("Players", data => this.setState(prevState => ({ players: data, gameMode: data[0].job ? GameModes.Playing : prevState.gameMode })));
  }

  startGame = () => {
    this.state.socket.emit('StartGame', true);
  }

  setPlayerName = (event) => {
    // console.log(event.target.value);
    this.state.socket.emit('PlayerName', {clientID:this.state.clientID, name: event.target.value});
  }

  avatarSelect = (image) => {
    this.state.socket.emit('PlayerAvatar', {clientID:this.state.clientID, avatar: image});
  }

  render() {
    const { response, players, clientID } = this.state;
    let myPlayerInfoIdx = players.findIndex(p=>p.id==clientID);
    let adminControl = null;
    let myPlayerInfo = null;
    if(myPlayerInfoIdx> -1){
      myPlayerInfo = players[myPlayerInfoIdx];
      if(myPlayerInfo.admin){
        adminControl = (
          <div style={{backgroundColor:"#00d1ff"}}>
            <p>You are the "Admin" player<br/>Press when everyone here!</p>
            <button onClick={this.startGame} style={{borderRadius:20}}>Start Game!</button>
          </div>
        )
      }
    }

    let playerEditInfo = (
      <div style={{textAlign:"center", marginTop:30}}>
        <span>
          <label>Your nickname:  </label>
          <input type="text" onChange={this.setPlayerName} placeholder={`Anonymous${clientID}`}/>
          <Popup trigger={<button style={{borderRadius:20}}>avatar</button>} modal contentStyle={{width:"70%", maxWidth:'250px', height: "75%", overflow: "scroll"}} lockScroll={false}>
          {close => (
            <div className="modal">
              <a className="close" onClick={close}>
                &times;
              </a>
              <div className="content">
                {AvatarGridList(this.avatarSelect, close)}
              </div>
            </div>
          )}
          </Popup>
        </span>
      </div>
    );

    let header = AppHeader();
    let gameView = null;
    switch (this.state.gameMode) {
      case GameModes.Loading:
        gameView = (<div style={{ textAlign: "center" }}><p>Game loading...</p></div>);
        break;    
      case GameModes.WaitForPlayers:
        gameView = (
          <div style={{ textAlign: "center" }}>
            <p style={{backgroundColor:'#5ae85a', margin:0}}>Online Players</p>
            <div>
              {PlayerList(players)}
            </div>
            <p style={{backgroundColor:"#f4cd52", margin:0}}>Waiting for Admin to start the game</p>
            {playerEditInfo}
            {adminControl}
          </div>
        );
        break;
      case GameModes.Playing:
          gameView = (
            <div style={{ textAlign: "center" }}>
              <p style={{backgroundColor:'#5ae85a', margin:0}}>Online Players</p>
              <div>
                {PlayerList(players)}
              </div>
              <div style={{borderColor:'red', borderStyle:"solid"}}>
                <p style={{backgroundColor:"#f4cd52", margin:0}}>Your Job Is: {myPlayerInfo.job}</p>
              </div>
              {playerEditInfo}
              {adminControl}
            </div>
          );
        break;
      default:
        gameView = (<div style={{ textAlign: "center" }}><p>Game Mode UnRecognized!</p></div>);
        break;
    }

    return (
        <div>
          { header }
          {gameView}
          {/* <div style={{ textAlign: "center" }}>          
            { clientID? <div>You are player ID: {clientID}</div> : null }
            <div>Players: {JSON.stringify(players)}</div>
            {adminControl}
            {response
                ? <p>
                  The temperature in Florence is: {response} °F
                </p>
                : <p>Loading...</p>}
          </div> */}
        </div>
    );
  }
}
export default App;


// import React from 'react';
// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
