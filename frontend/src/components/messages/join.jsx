// import React from 'react';
// import io from "socket.io-client";
// import HOST from "../../util/host";
// import {GameViewComponent} from '../gameView';
// import Lobby from "./lobby"

// import './join.css';

// // const Join = (props) => {
// class Join extends React.Component{
//     constructor(props){
//       super(props)

//       this.state = {
//         title: undefined,
//         gameType: undefined,
//         totalPlayers: undefined,
//         username: "",
//         buttonText: undefined,
//         roomName: "",
//         phase: "prelobby",
//         gameState: ""
        
//       }

//       this.socket = null;

//       this.update = this.update.bind(this);
//       this.handleStartSolo = this.handleStartSolo.bind(this);
//       this.handlePhaseChange = this.handlePhaseChange.bind(this);
//       this.receiveGameState = this.receiveGameState.bind(this);
//       this.handleGameStart = this.handleGameStart.bind(this);
//     }

//   componentDidMount(){
//     // this.socket = io(HOST);
//     this.socket = io(HOST);
//     // 

//     this.socket.on('connect', socket => {

//       this.socket.on("changePhase", this.handlePhaseChange)
//       this.socket.on("receiveGameState", this.receiveGameState)
      
//     })

//     this.setState({title: this.props.location.state.title,
//                    gameType: this.props.location.state.gameType,
//                    buttonText: this.props.location.state.buttonText,
//                    totalPlayers: this.props.location.state.totalPlayers
//                   }) 
//   }

//   update(field){
//      return e => this.setState({[field]: e.currentTarget.value})
//   }

//   handleStartSolo() {
//     // 
//     this.socket.emit("startSoloGame", {username: this.state.username});
//     this.setState({ roomName: this.socket.id });
//   }

//   handleGameStart(){
//     this.socket.emit("gameStartRender")
//   }

//   handlePhaseChange(phase){
//     this.setState({phase: phase})

//   }

//   receiveGameState(gameState) {
//     this.setState({ gameState: gameState });
//   }

//     render(){

//       let showInputField;
//       let displayPhase;

//       const chooseGameType = () => {
//         if(this.state.gameType){
//             switch(this.state.gameType){
//               case "solo":
//                 return (
//                   <div>
//                     <input placeholder="Choose your Username"
//                     value={this.state.username}
//                     onChange={this.update("username")} className="joinInput" type="text" />
//                   </div>
//                 )

//                 case "multiplayer":
//                   return (
//                     <>
//                     <div>
//                       <input placeholder="Choose your Username" className="joinInput" type="text" />
//                     </div>
//                     <div>
//                       <input placeholder="Room" className="joinInput mt-20" type="text" />
//                     </div>
//                     </>
//                   )
//           }
//         }
          
//       }

//       const displayPhaseFn = () => {

//           switch(this.state.phase){
//               case "prelobby":
//                 return (
//                   <div className="joinOuterContainer">
//                     <div className="joinInnerContainer">
//                       <h1 className="heading">{this.state.title}</h1>
//                       {showInputField}
//                       {/* <Link to={`/lobby`} > */}
//                         <button className={'button mt-20'} 
//                         onClick={this.handleStartSolo}
//                         type="submit">{this.state.buttonText}</button>
//                       {/* </Link> */}
//                     </div>
//                   </div>
//                 )

//               case "soloLobby":

//                 if(this.state.gameState){
//                     return (
//                       // <GameViewComponent board={this.state.gameState}/>
//                       <Lobby players={this.state.gameState.players}
//                       totalPlayers={this.state.totalPlayers}
//                       handleGameStart={this.handleGameStart}/>
//                   )
//                 }

//               case "soloGameStart":
//                 if(this.state.gameState){
//                     return(<GameViewComponent gameState={this.state.gameState}/>)
//                 }
                
              


//           }
//       }
      
//       showInputField = chooseGameType();
//       displayPhase = displayPhaseFn();

//       return (
//         <>
//         {displayPhase}
//         </>
//       );
//   }
// }

// export default Join;