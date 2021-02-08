const React = require("react");
const Board = require("./boardB")
const BoardObject = require("../classes/board")
const { set } = require("mongoose");
const {allDominos} = require("./allDominos")
const Chat = require('./messages/chat');
const Score = require('./gameScoreB.jsx');
const Countdown = require("./countdownS");

class GameB extends React.Component {
    constructor(props){
        super(props)
       
        this.state = {
            board: "",
            gameState: undefined
            }
        
        this.socket = this.props.socket
        this.previousPlayersArr = undefined;
        this.updateGame = this.updateGame.bind(this);
        this.restartGame = this.restartGame.bind(this);
    }

    



    componentDidUpdate(prevProps) {


        if(prevProps.gameState.arena !== this.props.gameState.arena){
            this.setState({gameState: this.props.gameState})
        }
        if(prevProps.gameState.inSession !== this.props.gameState.inSession){
            this.setState({gameState: this.props.gameState})
        }
 
    }


    componentDidMount(){
        this.setState({gameState: this.props.gameState})    
    }

    restartGame(e, isNewGame = undefined) {

        //start a brand new game with everything reset
        if(isNewGame){

            //emit new game Request
             this.props.socket.emit("restartGame", {roomName: this.state.gameState.roomName,
                                 newGameBoolean: true, newRoundBoolean: false })
               
        } else {
            // continue on to next round.
            //emit new round request
            this.props.socket.emit("restartGame", {roomName: this.state.gameState.roomName,
                                newGameBoolean: false, newRoundBoolean: true })    
        }
       
    }

    

    updateGame(posPlay, center, boneIdx) {
        // debugger 
        this.socket.emit("sentPlayerInput", {posPlay: posPlay,
        center: center, boneIdx: boneIdx, roomName: this.state.gameState.roomName})
       
    }

    render(){
        let modal;
     
        
        //Restart Game Modal
        if (this.state.gameState){
            // debugger
            if(this.state.gameState.winningPlayer){

                const {endGame, winningPlayer, lockedGame} = this.state.gameState;
        
                const text = endGame ? `${winningPlayer.username} wins the Game!` :
                            lockedGame ? 
                        `${winningPlayer.username} wins the Round via lockout! ` :
                        `${winningPlayer.username} wins the Round!`;

                const text2 = `Total Points: ${winningPlayer.points}`


                modal =
                <div className='modal-float-container-win'>
                    <div className='modal-container-win flex-row-start'>
                        <img className="capicua-domino" src={allDominos["cd"]}></img>
                        <div className='modal-content'>
                            <p>{text}</p>
                            <p>{text2}</p>
                            <Countdown restartGame={this.restartGame} endGame={this.state.gameState.endGame} />
                        </div>
                        <img className="capicua-domino" src={allDominos["cd"]}></img>
                    </div>
                </div>;
            }

            
        }
                   

        return (
            <>
                <div className="board-score-container flex-row-start">
                    {modal}
                    { this.state.gameState ? <Board gameState={this.state.gameState}
                    socket={this.props.socket} updateGame={this.updateGame} /> : null }
                    <div className="flex-col-start">
                        {/* <Chat board={this.state.board} key={"chat"}/> */}
                        <Score gameState={this.state.gameState} key={999}/>
                    </div>
                </div>
            </>
        )
    }

}

module.exports = GameB;