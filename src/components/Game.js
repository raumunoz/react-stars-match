import React, { Component, useEffect, useState } from 'react';
import PlayNumber from './PlayNumber';
import StarsDisplay from './StarsDisplay';
import utils from './utils';


const PlayAgain = props => (
	<div className="game-done">
  	<div 
    	className="message"
      style={{ color: props.gameStatus === 'lost' ? 'red' : 'green'}}
    >
  	  {props.gameStatus === 'lost' ? 'Game Over' : 'Nice'}
  	</div>
	  <button onClick={props.onClick}>Play Again</button>
	</div>
);

//Custom Hooks
const useGameState=()=>{
  /**Hooks en estados y side efects */
  const [stars, setStars] = useState(utils.random(1, 9));
  const [availableNums, setAvailableNums] = useState(utils.range(1, 9));
  const [candidateNums, setCandidateNums] = useState([]);
  const [secondsLeft,setSecondsLeft]=useState(10);
  //Side efect
  useEffect(()=>{
    /**Se ejecuta cuando va arenderizar */
    if(secondsLeft>0 && availableNums.length>0){
      const timerId=setTimeout(()=>{
        console.log("secondsLeft");
        setSecondsLeft(secondsLeft-1);
      },1000);
      //**Return se ejecuta antes de que va renderizar */
      return()=> clearTimeout(timerId);
    }    
  })
  
 
const setGameState=(newCandidateNums)=>{
  if (utils.sum(newCandidateNums) !== stars) {
    console.log("2");
    // si la suma de los candidatos todavia no da el valor de estrellas
    setCandidateNums(newCandidateNums)
  } else {
    console.log("3");
    /**SUma correcta */
    /**Se remueven los nuemros new candidates de los numeros avalibles porque fueron correctos*/
    const newAvailableNums = availableNums.filter(
      /**Remover los que dieron suma correcta */
      n => !newCandidateNums.includes(n)
    );
    /**remplazar los numeros avalibles*/
    setAvailableNums(newAvailableNums);
    /**limpiar los condidatos  */
    setCandidateNums([]);
    /** Re dibujar nuevas estrellas */
    setStars(utils.randomSumIn(newAvailableNums, 9));
  }
}
  return{stars,availableNums,candidateNums,secondsLeft,setGameState}
}

const Game = (props) => {
  /**Desestructar los elementos en el espacio local */
  const{
    stars,
    availableNums,
    candidateNums,
    secondsLeft,
    setGameState
  }=useGameState();
  /**Compútación que altera los estados */
  const candidatesArewrong = utils.sum(candidateNums) > stars;
  const gameStatus=availableNums.length===0?
  'won':secondsLeft===0 ? 'lost':'active'



  const onNumberClick = (number, currentStatus) => {

    //currentStatus=> newStatus
    if (currentStatus === 'used' || gameStatus!=='active') {
      console.log("1");
      return;
    }
    /**qu ehacer si el numero clickeado no está avalible */
    const newCandidateNums =
      /**Si está avalible agregarlo a candidatos */
      currentStatus === 'available' ?
        candidateNums.concat(number) :
        /**Si no está avalible removerlo de candidatos porque es erroneo */
        candidateNums.filter(cn => cn !== number);
    setGameState(newCandidateNums);
  }
  const numberStatus = (number) => {
    if (!availableNums.includes(number)) {
      /** No incluye esos numeros*/
      return 'used'
    }
    if (candidateNums.includes(number)) {
      
      /** No incluye esos numeros*/
      return candidatesArewrong ? 'wrong' : 'candidate';
    }
    return 'available'
  }
  /**Descripcion de la UI basada en todos los estados y  las computaciones basadas en los estados*/
  return (
    <div className="game">
      <div className="help">
        Pick 1 or more numbers that sum to the number of stars
      </div>
      <div className="body">
      <div className="left">
          {gameStatus !== 'active' ? (
          	<PlayAgain onClick={props.starNewGame} gameStatus={gameStatus} />
          ) : (
          	<StarsDisplay count={stars} />
          )}
        </div>
        <div className="right">
          {utils.range(1, 9).map(
            numero =>
              <PlayNumber
                key={numero}
                number={numero}
                status={numberStatus(numero)}
                onClick={onNumberClick}
              />
          )}
        </div>
      </div>
      <div className="timer">Time Remaining: {secondsLeft}</div>
    </div>
  );
}


export default Game;
