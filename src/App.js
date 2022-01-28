import logo from './logo.svg';
import Game from './components/Game';
import './App.css';
import { useState } from 'react/cjs/react.development';
// Math science

function App() {
  const [gameId,SetGameId]=useState(1);
  return (
    <div className="App">
    <Game key={gameId} starNewGame={()=>SetGameId(gameId+1)}/>
    </div>
  );
}

export default App;
